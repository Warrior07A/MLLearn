interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "python", title }: CodeBlockProps) {
  return (
    <div className="rounded-xl border-black-400  overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs text-zinc-400 font-mono">
          {title ?? language}
        </span>
      </div>
      {/* Code content */}
      <pre className="bg-zinc-950 text-zinc-100 text-sm p-6 overflow-x-auto leading-relaxed font-mono">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
