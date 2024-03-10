export default function SuccessBox({ children }) {
  return (
    <div className="bg-green-500 text-white rounded-xl px-4 py-2 my-4 border-4 border-green-300">
      {children}
    </div>
  );
}
