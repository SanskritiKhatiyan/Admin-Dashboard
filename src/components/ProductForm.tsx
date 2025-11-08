import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Upload,
  message,
  Card,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { ProductType } from "../constants/types";

interface ProductFormProps {
  initialValues?: ProductType | null;
  onSubmit: (values: ProductType) => void;
}

const { Option } = Select;

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        createdAt: dayjs(initialValues.createdAt),
      });

      if (initialValues.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: initialValues.image,
          },
        ]);
      }
    }
  }, [initialValues, form]);

  const handleImageChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const handleFinish = (values) => {
    const imageUrl =
      fileList[0]?.url ||
      (fileList[0]?.response && fileList[0]?.response.url) ||
      "";

    const newProduct: ProductType = {
      key: initialValues?.key || Math.random().toString(36).slice(2),
      id: initialValues?.id || `GFT-${Math.floor(Math.random() * 9000) + 1000}`,
      name: values.name,
      image: imageUrl,
      finalPrice: values.finalPrice,
      shippingType: values.shippingType,
      createdAt: values.createdAt.format("YYYY-MM-DD"),
      state: values.state,
      category: values.category,
      subcategory: values.subcategory,
      partner: values.partner,
    };

    onSubmit(newProduct);
    message.success(initialValues ? "Product updated!" : "Product added!");
    form.resetFields();
    setFileList([]);
  };

  return (
    <Card
      title={initialValues ? "Update Product" : "Add New Product"}
      style={{ maxWidth: 700, margin: "0 auto" }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          shippingType: "Free",
          state: "In Stock",
        }}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Final Price (₹)"
          name="finalPrice"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) =>
              `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item label="Shipping Type" name="shippingType">
          <Select>
            <Option value="Free">Free</Option>
            <Option value="Paid">Paid</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Created At"
          name="createdAt"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="State" name="state">
          <Select>
            <Option value="In Stock">In Stock</Option>
            <Option value="Out of Stock">Out of Stock</Option>
            <Option value="Discontinued">Discontinued</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Home & Decor">Home & Decor</Option>
            <Option value="Gift Hampers">Gift Hampers</Option>
            <Option value="Jewelry">Jewelry</Option>
            <Option value="Health & Wellness">Health & Wellness</Option>
            <Option value="Personal Care">Personal Care</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Subcategory" name="subcategory">
          <Input placeholder="e.g. Candles, Lamps, Cushions..." />
        </Form.Item>

        <Form.Item label="Partner" name="partner">
          <Input placeholder="Enter partner name" />
        </Form.Item>

        <Form.Item label="Product Image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleImageChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {initialValues ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
