import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Button = React.forwardRef(function Button(
  { className, variant = "default", type = "button", ...props },
  ref,
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ac8db] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";
  const variants = {
    default: "bg-[#2c3e73] text-white hover:bg-[#23325f] px-4 py-2",
    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 px-4 py-2",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100 px-3 py-2",
  };

  return (
    <button
      ref={ref}
      type={type}
      className={cx(base, variants[variant] ?? variants.default, className)}
      {...props}
    />
  );
});

