import { useEffect, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import Toast from "bootstrap/js/dist/toast";
import "@/styles/CartNotification.styles.css";

const CartNotification = () => {
  const toastRef = useRef(null);
  const showNotification = useCartStore(state => state.showNotification);
  const message = useCartStore(state => state.notificationMessage);

  useEffect(() => {
    if (showNotification && toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();

      const bar = toastRef.current.querySelector(".progress-bar");
      bar.style.transition = "none";
      bar.style.width = "100%";
      void bar.offsetWidth;
      bar.style.transition = "width 5s linear";
      bar.style.width = "0%";
    }
  }, [showNotification]);

  return (
    <div className="toast-container cart-notification-container p-3">
      <div
        ref={toastRef}
        className="toast rounded-4 overflow-hidden shadow"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="true"
        data-bs-delay="5000"
      >
        <div className="d-flex align-items-center toast-header bg-light border-bottom-0 bg-opacity-75">
          <h6 className="urbanist fw-semibold fs-6 mb-0 me-auto text-black">Notification</h6>
          <i className="bi bi-x-circle-fill fs-5 text-body-tertiary pointer" data-bs-dismiss="toast" aria-label="Close" />
        </div>
        <div style={{ height: 2 }} className="progress rounded-0">
          <div style={{ width: "100%" }} className="progress-bar bg-warning" role="progressbar" />
        </div>
        <div className="toast-body bg-light bg-opacity-75">
          <p className="inter fw-medium fs-7 text-body-secondary mb-0">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;