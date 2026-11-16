type Props = {
  line: string;
};

export function SiteFooter({ line }: Props) {
  return (
    <footer className="border-t border-line">
      <div className="container-page py-6 text-[14px] text-muted">{line}</div>
    </footer>
  );
}
