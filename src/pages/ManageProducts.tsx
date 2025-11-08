import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import ProductForm from "../components/ProductForm";
import type { ProductType } from "../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";

const ManageProducts: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (newProduct: ProductType) => {
    dispatch(addProduct(newProduct));
    setModalOpen(false);
  };

  const handleUpdate = (updatedProduct: ProductType) => {
    dispatch(updateProduct(updatedProduct));
    setModalOpen(false);
    setEditingProduct(null);
  };

  const openEditModal = (record: ProductType) => {
    setEditingProduct(record);
    setModalOpen(true);
  };

  const columns = [
    { title: "Product", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "finalPrice", key: "finalPrice" },
    { title: "Partner", dataIndex: "partner", key: "partner" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ProductType) => (
        <Button type="link" onClick={() => openEditModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        + Add Product
      </Button>
      <Table columns={columns} dataSource={products} rowKey="id" bordered />

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        footer={null}
        destroyOnClose
      >
        <ProductForm
          initialValues={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleAdd}
        />
      </Modal>
    </div>
  );
};

export default ManageProducts;
