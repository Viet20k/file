import Link from "next/link";
import "./index.scss";
import {ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import {useState} from "react";

export function Navbar(): JSX.Element {
  const [check, setCheck] = useState(1);
  const handleCheck = (e: number): void => {
    setCheck(e);
  };
  return (
    <div>
      <div className="navbar-wrap">
        <div className="navbar-wrap-childe">
          <div className="navbar-item item-logo">LOGO...</div>
          <Link href="/">
            <button
              type="button"
              className={`navbar-item ${check === 1 ? "item-manager" : ""}`}
              onClick={(): void => handleCheck(1)}
            >
              Trang Chủ
            </button>
          </Link>

          <Link className="navbar-item " href="/navbar_chider">
            <button
              type="button"
              className={`navbar-item ${check === 2 ? "item-manager" : ""}`}
              onClick={(): void => handleCheck(2)}
            >
              Quản Lý Sản Phẩm{" "}
            </button>
          </Link>
        </div>
        <div className="search-item">
          <Search placeholder="input search text" />
          <ShoppingCartOutlined />
          <UserOutlined />
        </div>
      </div>
    </div>
  );
}
