import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {

  it("renders hero title", () => {

    render(<Home />);

    expect(
      screen.getByText(
        /Stop Overspending on AI Tools/i
      )
    ).toBeInTheDocument();

  });

});