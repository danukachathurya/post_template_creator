const IconButton = ({ children, label, className = "", ...props }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
