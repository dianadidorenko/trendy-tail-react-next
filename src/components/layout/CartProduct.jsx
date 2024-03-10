import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({ product, index, onRemove }) {
  return (
    <div key={index} className="text-md">
      <div className="flex gap-2 items-center justify-between border-2 p-3">
        <div className="flex flex-col gap-2">
          <p>Назва: {product.valueName}</p>
          <p>Розмір: {product.valueSize}</p>
          <p>Кількість: 1</p>
          <p className="flex items-center gap-2">
            Ціна за од.
            <span className="text-lg">{product.price}</span> ₴
          </p>
        </div>
        <Image
          src={product.productImage}
          alt={product.valueName}
          width={120}
          height={120}
        />
        {onRemove && (
          <button type="button" onClick={() => onRemove(index)}>
            <Trash className="w-9 h-9" />
          </button>
        )}
      </div>
    </div>
  );
}
