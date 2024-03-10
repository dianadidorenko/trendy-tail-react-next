"use client";

import { useProfile } from "@/components/UseProfile";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import TIck from "@/components/icons/Tick";
import { CartContext } from "@/components/AppContext";
import {
  FullScreenImage,
  FullScreenImageBig,
} from "@/components/FullScreenImage";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRef } from "react";

export default function FutbolkaMariaPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  const [tableOpen, setTableOpen] = useState(false);
  const [itemId, setiItemId] = useState("");
  const [valueSize, setValueSize] = useState("");
  const [valueName, setValueName] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [selectedIndexSize, setSelectedIndexSize] = useState(0);

  const { addToCart } = useContext(CartContext);

  const inputRefs = useRef([]);

  function closeTable() {
    setTableOpen(false);
  }

  useEffect(() => {
    fetch("/api/products").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      setValueSize(inputRefs.current[0].id);
      menuItems.filter((item) => {
        if (item.name.split(" ")[1] === "Maria") {
          setiItemId(item._id);
          setValueName(item.name);
          setProductImage(item.image);
          setPrice(item.sizes[0].price);
        }
      });
    }
  }, [inputRefs.current[0]]);

  function handleAddToCartButtonClick() {
    const infoCart = { itemId, valueName, valueSize, productImage, price };
    addToCart(infoCart);
    toast.success("Товар доданий у корзину");
    menuItems.filter((item) => {
      item.name.split(" ")[1] === "Maria";
      setValueName(item.name);
      setProductImage(item.image);
    });
  }

  if (loading) {
    return <h2 className="text-center my-4">Завантаження...</h2>;
  }

  return (
    <>
      {menuItems
        .filter((item) => item.name.split(" ")[1] === "Maria")
        .map((i) => (
          <section>
            <div key={i._id} className="flex justify-center my-10 gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items">
                  <div>
                    <FullScreenImage
                      src={"/catalogue/info-item/futbolka-maria/01.jpg"}
                    />
                  </div>
                  <div>
                    <FullScreenImage
                      src={"/catalogue/info-item/futbolka-maria/02.jpg"}
                    />
                  </div>
                  <div>
                    <FullScreenImage
                      src={"/catalogue/info-item/futbolka-maria/03.jpg"}
                    />
                  </div>
                </div>
                <div className="">
                  <FullScreenImageBig
                    src={"/catalogue/info-item/futbolka-maria/01.jpg"}
                  />
                </div>
              </div>

              <div>
                <div>
                  <h1 className="text-primary text-2xl pb-10">{i.name}</h1>
                  <p className="max-w-[933px] mx-auto pb-10">
                    Українські улюбленці – найгарніші в світі. А якщо ваша
                    чотирилапа красуні вдягне яскраву футболку з
                    термоаплікацією-вишивкою, від неї просто неможливо буде
                    відвести очей! Футболка зручна та м’якенька,
                    рукави-ліхтарики з резинкою є окрасою моделі, а
                    термоаплікація з квітковим орнаментом перетворює її на
                    святкове вбрання.
                  </p>
                  <div className="flex flex-col gap-2 pb-10">
                    <div className="flex gap-2">
                      <p>Бренд:</p>
                      <p className="font-bold">{i.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <p>Матеріал:</p>
                      <p className="font-bold">80% котон, 20% поліестер</p>
                    </div>
                    <div className="flex gap-2">
                      <p>Сезон:</p>
                      <p className="font-bold">Літо</p>
                    </div>
                    <div className="flex gap-2">
                      <p>Колір:</p>
                      <p className="font-bold">Жовтий</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>Наявність:</p>
                      <p className="font-bold">
                        <TIck />
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p>Розмір:</p>
                  <div className="flex gap-6 my-4">
                    {i.sizes &&
                      i.sizes.map((p, index) => (
                        <div
                          key={p.name._id}
                          className="check-group flex items-center gap-1"
                        >
                          <input
                            id={p.name}
                            data-price={p.price}
                            type="radio"
                            defaultChecked={selectedIndexSize === index}
                            name="size"
                            value={p.name}
                            onChange={(e) => {
                              setValueSize(e.target.value);
                              setSelectedIndexSize(index);
                              setValueName(i.name);
                              setProductImage(i.image);
                              setPrice(p.price);
                            }}
                            ref={(el) => (inputRefs.current[index] = el)}
                          />
                          <label className="pl-3 pb-1">{p.name}</label>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 pt-4">
                    <Link
                      href={"#sizes"}
                      className="underline text-gray-500 cursor-pointer"
                      onClick={() => setTableOpen((prev) => !prev)}
                    >
                      Таблиця розмірів
                    </Link>
                    <Image
                      src="/catalogue/info-item/sizes.svg"
                      alt="Sizes icon"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>

                <p className="before-discount text-xl pt-5">
                  {!valueSize && (
                    <span>{i.sizes[0].priceBeforeDiscount} ₴</span>
                  )}

                  {valueSize &&
                    i.sizes.map(
                      (p) =>
                        valueSize === p.name && (
                          <span>{p.priceBeforeDiscount} ₴</span>
                        )
                    )}
                </p>

                <p className="text-2xl font-semibold pt-5 pb-8">
                  {!valueSize && <span>{i.sizes[0].price} ₴</span>}

                  {valueSize &&
                    i.sizes.map(
                      (p) => valueSize === p.name && <span>{p.price} ₴</span>
                    )}
                </p>
                <button
                  type="button"
                  className="button bg-redColor rounded-full py-2 px-11 text-white text-center"
                  onClick={handleAddToCartButtonClick}
                >
                  КУПИТЬ
                </button>
              </div>
            </div>

            <div>
              <Image
                src="/catalogue/info-item/paws.png"
                className="paws-decor"
                width={570}
                height={100}
                alt="Paws Decor"
                objectFit={"cover"}
              />

              <div className="below-block">
                <p className="text-3xl font-semibold">ОПИС</p>
                <div className="characteristics">
                  <p className="text-black">
                    <strong>Переваги футболки:</strong>
                  </p>
                  <ul>
                    <li>крій для чотирилапих красунь – із закритим животом;</li>
                    <li>м’який та еластичний бавовняний трикотаж;</li>
                    <li>вишуканий візерунок на спинці;</li>
                    <li>зручність вдягання.</li>
                  </ul>
                  <p>Матеріал: бавовняний трикотаж.</p>
                  <p>
                    Рекомендується ручне прання при температурі не вище 40 ℃.
                  </p>
                </div>
              </div>
            </div>

            {tableOpen && (
              <div id="sizes" className="sizes-table">
                <span
                  className="text-2xl closeSizesTable"
                  onClick={() => closeTable()}
                >
                  &times;
                </span>
                <h2 className="uppercase text-xl">Розмірна сітка</h2>
                <div>
                  <div className="flex gap-20 justify-center py-5">
                    <div className="flex flex-col items-center gap-2 max-w-[300px]">
                      <h3>Довжина тіла "A"</h3>
                      <Image
                        src="/catalogue/info-item/back-length.jpeg"
                        alt="Заміри спини"
                        width={200}
                        height={200}
                        objectFit={"cover"}
                      />
                      <img />
                      <p>&Xi;</p>
                      <p className="text-center">
                        Переконайтесь, що ваш собака стоїть прямо. Виміряйте
                        довжину тіла від шиї до хвоста. Якщо довжина тіла між
                        розмірами, то краще вибрати більшу.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 max-w-[300px]">
                      <h3>Об'єм грудей "B"</h3>
                      <Image
                        src="/catalogue/info-item/chest-meisure.jpeg"
                        alt="Заміри грудної клітки"
                        width={200}
                        height={200}
                        objectFit={"cover"}
                      />

                      <p>&Xi;</p>
                      <p className="text-center">
                        Відміряйте найширшу частину грудей вашого вихованця.
                        Зверніть увагу, що модель одягу може бути тонкою або
                        вільною відповідно до дизайну, тканини або за власним
                        смаком.
                      </p>
                    </div>
                  </div>

                  <div>
                    <table>
                      <tbody>
                        <tr className="bg-tableTitle">
                          <th className="font-bold text-sm">Розмір</th>
                          <th className="font-bold text-sm">
                            "A" довжина спини (см)
                          </th>
                          <th className="font-bold text-sm">
                            “В” об’єм грудей (см)
                          </th>
                          <th className="font-bold text-sm">Вага (кг)</th>
                          <th className="font-bold text-sm">
                            Рекомендовані породи
                          </th>
                        </tr>
                        <tr>
                          <td>XXS</td>
                          <td>20-22</td>
                          <td>25-29</td>
                          <td>до 1.5</td>
                          <td>Цуценята дрібних порід</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>XS</td>
                          <td>23-25</td>
                          <td>28-32</td>
                          <td>1.5-2.5</td>
                          <td>
                            Мініатюрний йоркширський тер'єр, чихуахуа,
                            мініатюрний пінчер, той-тер'єр
                          </td>
                        </tr>
                        <tr>
                          <td>XS такса</td>
                          <td>33-35</td>
                          <td>42-52</td>
                          <td>6.0-8.0</td>
                          <td>Такса</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>XS2</td>
                          <td>26-28</td>
                          <td>32-39</td>
                          <td>2.0-3.0</td>
                          <td>
                            Йоркширський тер'єр, чихуахуа, мініатюрний пінчер,
                            той-тер'єр, померанський шпіц, мальтезе, мальтіпу
                          </td>
                        </tr>
                        <tr>
                          <td>S</td>
                          <td>27-29</td>
                          <td>37-44</td>
                          <td>2.5-3.5</td>
                          <td>
                            Йоркширський тер'єр, чихуахуа, мініатюрний пінчер,
                            той-тер'єр, померанський шпіц, мальтезе, мальтіпу
                          </td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>S такса</td>
                          <td>38-40</td>
                          <td>44-54</td>
                          <td>8.0-10.0</td>
                          <td>Такса</td>
                        </tr>
                        <tr>
                          <td>S2</td>
                          <td>28-30</td>
                          <td>50-57</td>
                          <td>7.0-9.0</td>
                          <td>Мопс, французький бульдог</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>S2 такса</td>
                          <td>38-40</td>
                          <td>50-62</td>
                          <td>12.0-15.0</td>
                          <td>Такса, пекінес, невеликі коргі</td>
                        </tr>
                        <tr>
                          <td>SM</td>
                          <td>28-30</td>
                          <td>44-52</td>
                          <td>4.0-6.0</td>
                          <td>Пінчер, бішон фризе, джек-рассел-тер'єр</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>M</td>
                          <td>34-36</td>
                          <td>40-48</td>
                          <td>3.0-6.0</td>
                          <td>
                            Мальтезе, ши-тцу, той- пудель, карликовий пудель
                            (собаки середніх порід), бішон фризе,
                            кавалер-кінг-чарльз-спанієль
                          </td>
                        </tr>
                        <tr>
                          <td>M такса</td>
                          <td>43-45</td>
                          <td>50-62</td>
                          <td>10.0-13.0</td>
                          <td>Такса</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>M2</td>
                          <td>32-34</td>
                          <td>55-65</td>
                          <td>10.0-14.0</td>
                          <td>Мопс, французький бульдог</td>
                        </tr>
                        <tr>
                          <td>ML</td>
                          <td>33-35</td>
                          <td>44-55</td>
                          <td>4.0-7.0</td>
                          <td>Джек-рассел-тер'єр</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>L</td>
                          <td>38-40</td>
                          <td>47-56</td>
                          <td>6.0-13.0</td>
                          <td>
                            Китайська чубата, ши-тцу, той- пудель, пудель,
                            шнауцер, японський хін, кокер-спанієль
                          </td>
                        </tr>
                        <tr>
                          <td>XL</td>
                          <td>41-43</td>
                          <td>55-65</td>
                          <td>10.0-15.0</td>
                          <td>
                            Шнауцер, кокер-спаніель, фокстер'єр, скотчтер'єр,
                            цвергшнауцер, англійський спанієль, міні бультер'єр
                          </td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>2XL</td>
                          <td>44-46</td>
                          <td>60-72</td>
                          <td>20.0-25.0</td>
                          <td>Самоїд, бультер'єр</td>
                        </tr>
                        <tr>
                          <td>3XL</td>
                          <td>47-49</td>
                          <td>68-80</td>
                          <td>25.0-30.0</td>
                          <td>Самоїд великий, стаффорд, бультер'єр</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>4XL</td>
                          <td>49-51</td>
                          <td>72-85</td>
                          <td>30.0-35.0</td>
                          <td>Стаффорд, хаскі</td>
                        </tr>
                        <tr>
                          <td>5XL</td>
                          <td>55-57</td>
                          <td>78-91</td>
                          <td>35.0-45.0</td>
                          <td>Ретрівер, лабрадор, боксер</td>
                        </tr>
                        <tr className="bg-tableTitle">
                          <td>6XL</td>
                          <td>61-63</td>
                          <td>82-95</td>
                          <td>45.0-50.0</td>
                          <td>Вівчарка, ротвейлер, доберман</td>
                        </tr>
                        <tr>
                          <td>7XL</td>
                          <td>70-72</td>
                          <td>86-99</td>
                          <td>60.0-66.0</td>
                          <td>Кане-корсо</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
    </>
  );
}
