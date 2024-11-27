import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";

import config from "@/config";
import Details from "./page";
import { renderWithProviders } from "@/utils/test-utils";

import nav from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const useParams = nav.useParams as jest.MockedFunction<typeof nav.useParams>;

export const handlers = [
  http.get(`${config.url}/offers/:id`, async ({ params }) => {
    await delay(150);

    return HttpResponse.json({
      id: params.id,
      title: "title",
      description: "description",
      img_url: "http://example.com/image.png",
      price: 100,
    });
  }),
];

const server = setupServer(...handlers);

describe("Details", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should has title, description and render price", async () => {
    useParams.mockReturnValue({ offerId: "1" });

    renderWithProviders(<Details />);

    await screen.findByTestId("title");

    expect(screen.getByTestId("title")).toHaveTextContent("title");
    expect(screen.getByTestId("description")).toHaveTextContent("description");
    expect(screen.getByTestId("price")).toHaveTextContent("100");
  });
});
