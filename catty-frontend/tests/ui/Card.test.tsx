import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Card } from "@/ui/Card/Card";

describe("Card", () => {
  const mockImageUrl = "https://example.com/mock-cat.jpg";
  const MockActionElement = () => <svg />;

  it("calls onActionPressed when button is clicked", () => {
    const handleActionPressed = vi.fn();

    render(
      <Card
        imageUrl={mockImageUrl}
        ActionElement={MockActionElement}
        onActionPressed={handleActionPressed}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleActionPressed).toHaveBeenCalledTimes(1);
  });
});
