import classnames from "classnames";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  Nav,
  NavItem,
  NavLink,
  Row,
  Label,
  Input,
  Button,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

const Rank = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab, status) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      // Thực hiện hành động với trạng thái "status" nếu cần.
      console.log(`Tab ${tab} với trạng thái: ${status}`);
    }
  };
  const rankSchema = Yup.object().shape({
    name: Yup.string().required("Tên hiển thị cấp bậc của thành viên"),
    total_spent: Yup.number()
      .required("Tổng số tiền VNĐ chi tiêu để đạt được cấp bậc đó")
      .min(1, "Tổng chi tiêu phải lớn hơn 0"),
    ticket_discount: Yup.number()
      .required("Tỷ phần trăm(%) điểm tích lũy nhận được khi đặt vé")
      .min(0, "Không thể nhỏ hơn 0")
      .max(100, "Không thể lớn hơn 100"),
    combo_discount: Yup.number()
      .required("Tỷ lệ phần trăm(%) điểm tích lũy nhận được khi đặt combo")
      .min(0, "Không thể nhỏ hơn 0")
      .max(100, "Không thể lớn hơn 100"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      total_spent: "",
      ticket_discount: "",
      combo_discount: "",
    },
    validationSchema: rankSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      toggle();
      resetForm();
    },
  });
  const toggle = () => setModal(!modal);
  // Column
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Cấp bậc",
      accessorKey: "orderId",
      enableColumnFilter: false,
    },
    {
      header: "Tổng chi tiêu",
      accessorKey: "customer",
      enableColumnFilter: false,
    },
    {
      header: "% vé",
      accessorKey: "",
      enableColumnFilter: false,
    },
    {
      header: "% combo",
      accessorKey: "",
      enableColumnFilter: false,
    },
    {
      header: "Ngày tạo",
      accessorKey: "",
      enableColumnFilter: false,
    },
    {
      header: "Ngày cập nhật",
      accessorKey: "status",
      enableColumnFilter: false,
    },
    {
      header: "Action",
      accessorKey: "payment",
      enableColumnFilter: false,
    },
  ]);

  document.title = "";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý cấp bậc thành viên" pageTitle="Danh sách" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">
                      Quản lý danh sách cấp bậc thành viên
                    </h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          setIsEdit(false);
                          toggle();
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i>
                        Thêm mới
                      </button>{" "}
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div>

                  <TableContainer
                    columns={columns}
                    data={[]}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search Rank..."
                  />
                </div>
                <Modal isOpen={modal} toggle={toggle} centered>
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {isEdit ? "Sửa cấp bậc" : "Thêm cấp bậc"}
                  </ModalHeader>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                      {/* Tên cấp bậc */}
                      <div className="mb-3">
                        <label className="form-label">Tên cấp bậc</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập tên cấp bậc"
                          {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>

                      {/* Tổng chi tiêu */}
                      <div className="mb-3">
                        <label className="form-label">Tổng chi tiêu</label>
                        <input
                          type="number"
                          className={`form-control ${
                            formik.touched.total_spent &&
                            formik.errors.total_spent
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập tổng chi tiêu"
                          {...formik.getFieldProps("total_spent")}
                        />
                        {formik.touched.total_spent &&
                          formik.errors.total_spent && (
                            <div className="invalid-feedback">
                              {formik.errors.total_spent}
                            </div>
                          )}
                      </div>

                      {/* Phần trăm vé */}
                      <div className="mb-3">
                        <label className="form-label">Phần trăm vé</label>
                        <input
                          type="number"
                          className={`form-control ${
                            formik.touched.ticket_discount &&
                            formik.errors.ticket_discount
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập phần trăm vé"
                          {...formik.getFieldProps("ticket_discount")}
                        />
                        {formik.touched.ticket_discount &&
                          formik.errors.ticket_discount && (
                            <div className="invalid-feedback">
                              {formik.errors.ticket_discount}
                            </div>
                          )}
                      </div>

                      {/* Phần trăm combo */}
                      <div className="mb-3">
                        <label className="form-label">Phần trăm combo</label>
                        <input
                          type="number"
                          className={`form-control ${
                            formik.touched.combo_discount &&
                            formik.errors.combo_discount
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Nhập phần trăm combo"
                          {...formik.getFieldProps("combo_discount")}
                        />
                        {formik.touched.combo_discount &&
                          formik.errors.combo_discount && (
                            <div className="invalid-feedback">
                              {formik.errors.combo_discount}
                            </div>
                          )}
                      </div>
                    </ModalBody>

                    <div className="modal-footer">
                      <Button type="button" color="light" onClick={toggle}>
                        Đóng
                      </Button>
                      <Button type="submit" color="success">
                        {isEdit ? "Sửa" : "Thêm"}
                      </Button>
                    </div>
                  </form>
                </Modal>

                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rank;
