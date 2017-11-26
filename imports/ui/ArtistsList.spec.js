import React from "react";
import { shallow } from "enzyme";

// jest.mock("meteor/react-meteor-data", () => "a")
// jest.mock("../../imports/ui/Artists", () => "artists")

import ArtistsList from "./ArtistsList";

it("renders without crashing", () => {
  const component = shallow(<ArtistsList />);
  expect(component).toBeDefined();
});

it("should render loading", () => {
  const component = shallow(<ArtistsList loading="true" />);
  expect(component.find(".table-wrapper")).toHaveLength(0);
  expect(component.find("span").text()).toEqual("Loading...");
});

it("should render content", () => {
  const component = shallow(<ArtistsList />);
  expect(component.find(".table-wrapper")).toHaveLength(1);
});

it("should render artists", () => {
  const artists = [{_id: 1}, {_id: 2}]
  const component = shallow(<ArtistsList artists={artists} />);
  expect(component.find(".artist-row")).toHaveLength(artists.length);
});

it("should show empty message", () => {
  const artists = []
  const component = shallow(<ArtistsList artists={artists} />);
  expect(component.find(".artist-row")).toHaveLength(0);
  expect(component.find("tr span").text()).toEqual("No artists to show");
  
});
