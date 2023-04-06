import "./index.scss";
import {useRef, useState} from "react";
import Image from "next/image";
import {useMutation, useQuery} from "react-query";

import axios from "axios";
import {CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Space, Spin} from "antd";

export interface Product {
  name?: string;
  price?: string;
  title?: string;
  link?: string;
  id?: number;
}
export function PageManager(): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [tablesTmp, checkTableTmp] = useState<Product>({
    name: "",
    price: "",
    title: "",
    link: "",
  });
  // async function fetchUsers() {
  //   const data = await console.log(1);
  //   return data;
  // }

  // useEffect(() => {
  //   refetch();
  // }, [data]);

  const {data, refetch} = useQuery("users", () =>
    axios.get("https://64197b16c152063412c30d87.mockapi.io/kmm")
  );
  const mutation = useMutation((tablesTmp: Product): Promise<any> => {
    return axios
      .post("https://64197b16c152063412c30d87.mockapi.io/kmm", tablesTmp)
      .then(() => refetch());
  });

  const handleChose = (): any => {
    mutation.mutate(tablesTmp);
    // axios
    //   .post("https://64197b16c152063412c30d87.mockapi.io/kmm", tablesTmp)
    //   .then(() => {
    //     refetch();
    //   });
    checkTableTmp({
      name: "",
      title: "",
      link: "",
      price: "",
      id: undefined,
    });
  };

  const handleChange = (e: any): void => {
    if (e.target.name === "price") {
      if (!Number(e.target.value)) {
        alert("nó là number má ơi ");
        checkTableTmp({...tablesTmp, [e.target.name]: ""});
      } else checkTableTmp({...tablesTmp, [e.target.name]: e.target.value});
    } else checkTableTmp({...tablesTmp, [e.target.name]: e.target.value});
    console.log(e.target.name, e.target.value);
  };

  const handleImage = (e: any): void => {
    const file = e?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String =
        typeof reader.result === "string"
          ? reader.result.replace("data:", "").replace(/^.+,/, "")
          : "";
      checkTableTmp({...tablesTmp, [e.target.name]: base64String});
    };
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const HandleEdit = (e: number): void => {
    checkTableTmp(data?.data[e]);
    setEdit(e);
  };
  const handleChangeedit = (e: any): void => {
    checkTableTmp({...tablesTmp, [e.target.name]: e.target.value});
  };
  const mutateAsync = useMutation(
    ({users, target}: {users: any; target: Product}): Promise<any> => {
      return axios
        .put(`https://64197b16c152063412c30d87.mockapi.io/kmm/${users}`, target)
        .then(() => {
          checkTableTmp({
            name: "",
            price: "",
            title: "",
            link: "",
          });
          refetch();
        });
    }
  );

  const handleChoseedit = (
    users: any,
    index: number,
    target: Product
  ): void => {
    setEdit(-1);
    mutateAsync.mutateAsync({users, target});
    // axios
    //   .put(
    //     `https://64197b16c152063412c30d87.mockapi.io/kmm/${users}`,
    //     tablesTmp
    //   )
    //   .then(() => {
    //     checkTableTmp({
    //       name: "",
    //       price: "",
    //       title: "",
    //       link: "",
    //       id: undefined,
    //     });
    //     refetch();
    //   });
  };
  const deleteItemMutation = useMutation((itemId) =>
    axios
      .delete(`https://64197b16c152063412c30d87.mockapi.io/kmm/${itemId}`)
      .then(() => refetch())
  );
  const handleChosedeleta = (users: any): void => {
    deleteItemMutation.mutate(users);
  };
  return (
    <div id="product-management">
      <button
        className="show-table"
        type="button"
        onClick={(): void => handleToggle()}
      >
        thêm sản phẩm
      </button>
      {toggle && (
        <div role="presentation" className="table-more-products">
          <div id="toggle" ref={divRef}>
            <div className="table-toggle">
              <div>
                Thêm sản phẩm
                <CloseOutlined onClick={(): void => handleToggle()} />
              </div>
              <input
                value={tablesTmp.title}
                type="text"
                placeholder="tên phản phẩm"
                name="title"
                onChange={(e): void => handleChange(e)}
              />
              <input
                value={tablesTmp.name}
                type="text"
                placeholder="tên phản phẩm"
                name="name"
                onChange={(e): void => handleChange(e)}
              />
              <input
                value={tablesTmp.price}
                type="text"
                placeholder="tên phản phẩm"
                name="price"
                onChange={(e): void => handleChange(e)}
              />

              <input
                type="file"
                name="link"
                onChange={(e): void => handleImage(e)}
              />
              <button type="button" onClick={(): void => handleChose()}>
                {mutation.isLoading ? (
                  <div>
                    <Space>
                      <Spin tip="Loading" size="small">
                        <div className="content" />
                      </Spin>
                    </Space>
                  </div>
                ) : (
                  "chọn"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="PageManger-page">
        <tr className="fix-table">
          <th className="products-name">Tên sản phẩm</th>
          <th className="products-image">ảnh</th>
          <th className="products-price">Giá</th>
          <th className="products-decribe">Mô tả</th>
        </tr>

        {data?.data.map((table: Product, index: number) =>
          edit === index ? (
            <tr key={index} className="product-table">
              <th className="products-name-child">
                <input
                  type="text"
                  name="name"
                  defaultValue={table?.name}
                  onChange={(e): void => handleChangeedit(e)}
                />
              </th>
              <th className="products-image-child">
                <input
                  type="file"
                  name="link"
                  onChange={(e): void => handleImage(e)}
                />
              </th>
              <th className="products-price-child">
                <input
                  type="text"
                  name="price"
                  defaultValue={table?.price}
                  onChange={(e): void => handleChangeedit(e)}
                />
              </th>
              <th className="products-decribe-child">
                <input
                  type="text"
                  name="title"
                  defaultValue={table?.title}
                  onChange={(e): void => handleChangeedit(e)}
                />
              </th>
              <th>
                <EditOutlined
                  onClick={(): void => handleChoseedit(table?.id, index, table)}
                />
              </th>
            </tr>
          ) : (
            <tr key={index} className="product-table">
              <th className="products-name-child">{table?.name}</th>
              <th className="products-image-child">
                <Image
                  src={`data:image/png;base64,${table?.link}`}
                  alt="ádasd"
                  width="70"
                  height="70"
                />
              </th>
              <th className="products-price-child">{table?.price}</th>
              <th className="products-decribe-child">{table?.title}</th>
              <th>
                <EditOutlined onClick={(): void => HandleEdit(index)} />

                <DeleteOutlined
                  onClick={(): void => handleChosedeleta(table?.id)}
                />
              </th>
            </tr>
          )
        )}
      </table>
    </div>
  );
}
