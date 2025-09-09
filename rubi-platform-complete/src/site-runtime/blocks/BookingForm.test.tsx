import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import BookingForm from "./BookingForm";

test("submits form payload", async () => {
  const user = userEvent.setup();
  const fetchMock = vi
    // @ts-expect-error - global fetch typing in test env
    .spyOn(global, "fetch")
    // @ts-expect-error - construct Response in jsdom env
    .mockResolvedValue(new Response(null, { status: 200 }));
  vi.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <BookingForm
      submitTo="/api/booking"
      fields={[
        { name: "name", label: "Your Name", required: true },
        { name: "email", label: "Email", required: true },
      ]}
    />
  );

  await user.type(screen.getByLabelText("Your Name"), "Tyler");
  await user.type(screen.getByLabelText("Email"), "t@example.com");
  await user.click(screen.getByRole("button", { name: /request booking/i }));

  expect(fetchMock).toHaveBeenCalledWith(
    "/api/booking",
    expect.objectContaining({ method: "POST" })
  );
});

