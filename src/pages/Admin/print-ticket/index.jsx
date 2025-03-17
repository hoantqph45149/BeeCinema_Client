import React from "react";
import PrintTicketSeat from "./PrintTicketSeat";
import printJS from "print-js";
import { Button } from "reactstrap";
import PrintTicketDetail from "./PrintTicketDetail";

export default function PrintTicket({ ticket }) {
  const handlePrint = () => {
    printJS({
      printable: "beecinema",
      type: "html",
      style: `
        @media print {
          #beecinema {
            display: block !important;
          }
        }

        /* Định nghĩa kích thước trang A4 */
        @page { size: A4; margin: 0mm; padding: 0mm; }
        
        /* Reset margin và padding mặc định */
        body { margin: 0; padding: 0; background: white !important; }
        import Ticket from './../ticket/index';

        /* Đảm bảo mỗi ticketContainer chiếm một trang */
        .ticketContainer {
          page-break-after: always;
          text-align: center;
          box-sizing: border-box;
        }

        .ticketContainer:last-child {
          page-break-after: auto;
        }
      `,
      scanStyles: false,
      documentTitle: "Beecinema",
    });
  };

  return (
    <>
      <Button color="primary" onClick={handlePrint}>
        <i className="ri-printer-line"></i> In Vé
      </Button>
      <div
        style={{
          display: "none",
          fontFamily: '"OCR-B", "Courier New", "Roboto Mono", sans-serif',
        }}
        id="beecinema"
      >
        <div className="ticketContainer">
          <PrintTicketDetail data={ticket} />
        </div>
        {ticket.seats?.details?.map((item) => (
          <div key={item.seat_id} className="ticketContainer">
            <PrintTicketSeat seat={item} ticket={ticket} />
          </div>
        ))}
      </div>
    </>
  );
}
