import classnames from "classnames";
import React, { useMemo, useState } from "react";
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
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Room = () => {
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
      header: "Phòng chiếu",
      accessorKey: "orderId",
      enableColumnFilter: false,
    },
    {
      header: "Rạp chiếu",
      accessorKey: "customer",
      enableColumnFilter: false,
    },
    {
      header: "Loại Phòng",
      accessorKey: "product",
      enableColumnFilter: false,
    },
    {
      header: "Sức chứa",
      accessorKey: "orderDate",
      enableColumnFilter: false,
    },
    {
      header: "Trạng thái",
      accessorKey: "amount",
      enableColumnFilter: false,
    },
    {
      header: "Hoạt động",
      accessorKey: "payment",
      enableColumnFilter: false,
    },
  ]);

  document.title = "";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Danh sách phòng chiếu" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách phòng chiếu</h5>
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
                        Tạo phòng chiếu
                      </button>{" "}
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        Tất cả
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "Delivered");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Đã xuất bản
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3", "Pickups");
                        }}
                        href="#"
                      >
                        Bản nháp
                        <span className="badge bg-danger align-middle ms-1">
                          2
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TableContainer
                    columns={columns}
                    data={[]}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Search for order ID, customer, order status or something..."
                  />
                </div>
                <Modal
                  id="showModal"
                  isOpen={modal}
                  toggle={toggle}
                  centered
                ></Modal>
                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Room;
