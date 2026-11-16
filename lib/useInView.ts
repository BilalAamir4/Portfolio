import { useEffect, useState, type RefObject } from "react";

export type InViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

type Entry = { callback: (visible: boolean) => void };
type Shared = { observer: IntersectionObserver; targets: Map<Element, Entry> };

/**
 * One IntersectionObserver per distinct set of options, shared by every
 * element on the page that uses those options. Elements are added and
 * removed as components mount and unmount; the observer disconnects when
 * it has nothing left to watch.
 */
const shared = new Map<string, Shared>();

function keyOf({ rootMargin = "0px", threshold = 0 }: InViewOptions) {
  return `${rootMargin}|${threshold}`;
}

/**
 * Watch an element with the shared observer for these options.
 * Returns a function that stops watching it.
 */
export function observe(
  element: Element,
  callback: (visible: boolean) => void,
  options: InViewOptions = {},
): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const key = keyOf(options);
  let entry = shared.get(key);
  if (!entry) {
    const targets = new Map<Element, Entry>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          targets.get(record.target)?.callback(record.isIntersecting);
        }
      },
      { rootMargin: options.rootMargin, threshold: options.threshold },
    );
    entry = { observer, targets };
    shared.set(key, entry);
  }

  const current = entry;
  current.targets.set(element, { callback });
  current.observer.observe(element);

  return () => {
    current.observer.unobserve(element);
    current.targets.delete(element);
    if (current.targets.size === 0) {
      current.observer.disconnect();
      shared.delete(key);
    }
  };
}

/**
 * True while the element intersects (or, with `once`, from the first time
 * it does). Uses the shared observer above.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { once = false, ...options }: InViewOptions & { once?: boolean } = {},
): boolean {
  const [inView, setInView] = useState(false);
  const { rootMargin, threshold } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let stop = () => {};
    stop = observe(
      element,
      (visible) => {
        if (visible && once) {
          setInView(true);
          stop();
          return;
        }
        setInView(visible);
      },
      { rootMargin, threshold },
    );
    return () => stop();
  }, [ref, once, rootMargin, threshold]);

  return inView;
}
