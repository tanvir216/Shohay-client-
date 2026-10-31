export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-12">
      <div className="w-full rounded-box border border-base-300 bg-base-200/50 p-8">
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="mb-6 mt-1 opacity-80">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
