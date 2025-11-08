import { Table, Tag } from "antd";
import { Image as AntdImage } from "antd";
import type { ProductType } from "../constants/types";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Dashboard = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const columns = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <AntdImage
          src={image}
          alt="product"
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: 8 }}
          preview={false}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Final Price (₹)",
      dataIndex: "finalPrice",
      key: "finalPrice",
      sorter: (a: ProductType, b: ProductType) => a.finalPrice - b.finalPrice,
      render: (price: number) => <span>₹{price.toLocaleString()}</span>,
    },
    {
      title: "Shipping",
      dataIndex: "shippingType",
      key: "shippingType",
      render: (type: string) => (
        <Tag color={type === "Free" ? "green" : "volcano"}>{type}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: ProductType, b: ProductType) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state: string) => {
        const color =
          state === "In Stock"
            ? "green"
            : state === "Out of Stock"
            ? "orange"
            : "red";
        return <Tag color={color}>{state}</Tag>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "subcategory",
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
    },
  ];

  return (
    <>
      <h2 style={{ marginBottom: 16 }}>Product Lists</h2>
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 7 }}
        bordered
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default Dashboard;
