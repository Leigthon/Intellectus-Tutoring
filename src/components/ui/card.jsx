import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }) {
  return (
    <div
      className={cx("rounded-2xl border border-gray-200 bg-white", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cx("p-6", className)} {...props} />;
}

