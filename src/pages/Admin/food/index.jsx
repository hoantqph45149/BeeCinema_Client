import React, { useMemo, useState } from "react";
import { Card, CardHeader, Col, Container, Modal, Row } from "reactstrap";

import { Link } from "react-router-dom";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import TableContainer from "../../../Components/Common/TableContainer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Food = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // Customers Column
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
    },
    {
      header: "Tên đồ ăn",
      accessorKey: "customer",
      enableColumnFilter: false,
    },
    {
      header: "Loại đồ ăn",
      accessorKey: "phone",
      enableColumnFilter: false,
    },
    {
      header: "Hình ảnh",
      accessorKey: "phone",
      enableColumnFilter: false,
    },
    {
      header: "Gía",
      accessorKey: "phone",
      enableColumnFilter: false,
    },
    {
      header: "Hoạt động",
      accessorKey: "date",
      enableColumnFilter: false,
    },
    {
      header: "Action",
      cell: (cellProps) => {
        return (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item edit" title="Edit">
              <Link
                to="#"
                className="text-primary d-inline-block edit-item-btn"
                onClick={() => {
                  const customerData = cellProps.row.original;
                  handleCustomerClick(customerData);
                }}
              >
                <i className="ri-pencil-fill fs-16"></i>
              </Link>
            </li>
            <li className="list-inline-item" title="Remove">
              <Link
                to="#"
                className="text-danger d-inline-block remove-item-btn"
                onClick={() => {
                  const customerData = cellProps.row.original;
                  onClickDelete(customerData);
                }}
              >
                <i className="ri-delete-bin-5-fill fs-16"></i>
              </Link>
            </li>
          </ul>
        );
      },
    },
  ]);

  document.title = "Customers | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý đồ ăn" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Danh sách đồ ăn</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          đồ ăn
                        </button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={[]}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      className="custom-header-css"
                      SearchPlaceholder="Search for customer, email, phone, status or something..."
                    />
                  </div>
                  <Modal
                    id="showModal"
                    isOpen={modal}
                    toggle={toggle}
                    centered
                  ></Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Food;
