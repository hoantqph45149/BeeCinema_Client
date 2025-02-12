import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useNavigate } from "react-router-dom";

const AddCinema = () => {
  const nav = useNavigate();
  const { data: branches } = useFetch(["branches"]);
  const { create: createCinema } = useCRUD();

  //  Xác thực dữ liệu với Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên rạp không được để trống"),
    branch_id: Yup.string().required("Vui lòng chọn chi nhánh"),
    address: Yup.string().required("Địa chỉ không được để trống"),
    description: Yup.string().required("Mô tả không được để trống"),
  });

  //  Quản lý form với Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      branch_id: "",
      address: "",
      description: "",
      is_active: true,
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      createCinema.mutate({ url: "/cinemas", data: values });
      nav("/admin/cinema");
    },
  });

  document.title = "Create cinema";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Thêm Mới Rạp Chiếu" pageTitle="Quản lý" />

        <Row>
          <Col lg={8}>
            <Form onSubmit={formik.handleSubmit}>
              <Card>
                <CardBody>
                  <Row>
                    {/* Tên rạp */}
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="name">
                          Tên rạp
                        </Label>
                        <Input
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          id="name"
                          placeholder="Nhập tên rạp"
                          {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    </Col>

                    {/* Chi nhánh */}
                    <Col lg={6} md={12}>
                      <div className="mb-3">
                        <Label htmlFor="branch_id" className="form-label">
                          Chi nhánh
                        </Label>
                        <select
                          id="branch_id"
                          className="form-select mb-3"
                          {...formik.getFieldProps("branch_id")}
                        >
                          <option value="">Chọn chi nhánh</option>
                          {branches?.data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {formik.touched.branch_id &&
                          formik.errors.branch_id && (
                            <div className="text-danger">
                              {formik.errors.branch_id}
                            </div>
                          )}
                      </div>
                    </Col>
                  </Row>

                  {/* Địa chỉ */}
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="address">
                      Địa chỉ
                    </Label>
                    <Input
                      type="text"
                      className={`form-control ${
                        formik.touched.address && formik.errors.address
                          ? "is-invalid"
                          : ""
                      }`}
                      id="address"
                      placeholder="Nhập địa chỉ"
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="text-danger">{formik.errors.address}</div>
                    )}
                  </div>

                  {/* Mô tả */}
                  <div className="mb-3">
                    <Label htmlFor="description" className="form-label">
                      Mô tả
                    </Label>
                    <textarea
                      id="description"
                      className={`form-control ${
                        formik.touched.description && formik.errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Nhập mô tả"
                      rows="3"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-danger">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <Button color="primary" type="submit" className="btn w-sm">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>

          {/* Trạng thái */}
          <Col lg={4}>
            <Card>
              <CardBody>
                <div className="mb-3 form-check form-switch form-switch-primary">
                  <Label htmlFor="is_active" className="form-label">
                    Trạng thái
                  </Label>
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="is_active"
                    checked={formik.values.is_active}
                    onChange={formik.handleChange}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCinema;
