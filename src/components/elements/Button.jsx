import Link from "next/link";

export default function Button({ text, href }) {
  return (
    <Link
      href={href}
      className="button bg-redColor rounded-full py-4 px-11 text-white text-center"
    >
      {text}
    </Link>
  );
}
