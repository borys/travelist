import "@testing-library/jest-dom";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";

import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/test-utils";
import { OfferList } from "./page";

import config from "../config";

export const handlers = [
  http.get(`${config.url}/offers`, async ({request}) => {
    await delay(150);

    const url = new URL(request.url)
    const offset = parseInt(url.searchParams.get('_start') ?? '0');

    if (offset === 0) {
      return HttpResponse.json([
        {
          id: 1,
          title: "title",
          description: "description",
          img_url: "http://example.com/image.png",
          price: 100,
        },
      ]);
    } else {
      return HttpResponse.json([
        {
          id: 2,
          title: "next page",
          description: "description",
          img_url: "http://example.com/image.png",
          price: 100,
        },
      ]);
    }
  }),
];

const server = setupServer(...handlers);

describe("OfferList", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should contain item with correct title, description, image and price", async () => {
    renderWithProviders(<OfferList />);

    await screen.findByTestId('item-title');

    expect(screen.getByTestId("item-title")).toHaveTextContent("title");
    expect(screen.getByTestId("item-description")).toHaveTextContent("description");
    expect(screen.getByTestId("item-price")).toHaveTextContent("100");
  });

  it("should load more data on scroll bottom", async () => {
    renderWithProviders(<OfferList />);

    await screen.findByTestId('item-title');

    const scrollableView = screen.getByTestId('scrollable-view');
    
    jest
      .spyOn(scrollableView, 'scrollHeight', 'get')
      .mockReturnValue(100.12);
    jest
      .spyOn(scrollableView, 'scrollTop', 'get')
      .mockReturnValue(50);
    jest
      .spyOn(scrollableView, 'clientHeight', 'get')
      .mockReturnValue(50);


    await fireEvent.scroll(scrollableView);
    await screen.findByText('next page')

    expect(screen.getByTestId('scrollable-view').children.length).toBe(2);
  });
});
