document.addEventListener("DOMContentLoaded", function () {
  // Xử lý form tạo mới
  const createForm = document.getElementById("createBookingForm");
  if (createForm) {
    createForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {
        customerName: formData.get("customerName"),
        date: formData.get("date"),
        time: formData.get("time"),
      };

      try {
        const response = await fetch("/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          showAlert("success", result.message);
          setTimeout(() => {
            window.location.href = "/bookings";
          }, 1500);
        } else {
          showAlert("error", result.message);
        }
      } catch (error) {
        showAlert("error", "Đã xảy ra lỗi khi xử lý yêu cầu");
      }
    });
  }

  // Xử lý form chỉnh sửa
  const editForm = document.getElementById("editBookingForm");
  if (editForm) {
    editForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const bookingId = this.dataset.bookingId;
      const formData = new FormData(this);
      const data = {
        customerName: formData.get("customerName"),
        date: formData.get("date"),
        time: formData.get("time"),
      };

      try {
        const response = await fetch(`/bookings/${bookingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          showAlert("success", result.message);
          setTimeout(() => {
            window.location.href = "/bookings";
          }, 1500);
        } else {
          showAlert("error", result.message);
        }
      } catch (error) {
        showAlert("error", "Đã xảy ra lỗi khi xử lý yêu cầu");
      }
    });
  }

  // Hàm xử lý hủy đặt chỗ
  window.cancelBooking = async function (bookingId) {
    if (confirm("Bạn có chắc chắn muốn hủy đặt chỗ này?")) {
      try {
        const response = await fetch(`/bookings/${bookingId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) {
          showAlert("success", result.message);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          showAlert("error", result.message);
        }
      } catch (error) {
        showAlert("error", "Đã xảy ra lỗi khi xử lý yêu cầu");
      }
    }
  };

  // Hàm hiển thị thông báo
  function showAlert(type, message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector(".container");
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }

  // Kiểm tra và giới hạn thời gian đặt chỗ
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach((input) => {
    // Đặt giá trị tối thiểu là ngày hiện tại
    const today = new Date().toISOString().split("T")[0];
    input.min = today;

    input.addEventListener("change", function () {
      if (this.value < today) {
        this.value = today;
        showAlert("error", "Không thể chọn ngày trong quá khứ");
      }
    });
  });

  const timeInputs = document.querySelectorAll('input[type="time"]');
  timeInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const selectedTime = this.value;
      const [hours, minutes] = selectedTime.split(":");

      // Giả sử giờ làm việc từ 8:00 đến 22:00
      if (hours < 8 || hours >= 22) {
        this.value = "08:00";
        showAlert("error", "Vui lòng chọn giờ từ 8:00 đến 22:00");
      }
    });
  });
});
