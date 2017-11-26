import React from "react";
import { shallow } from "enzyme";

import ArtistsSearch from "./ArtistsSearch";

const onResult = jest.fn();

it("renders without crashing", () => {
  const component = shallow(<ArtistsSearch onResult={onResult} />);
  expect(component).toBeDefined();
});

it("should render loading", () => {
  const component = shallow(<ArtistsSearch onResult={onResult} loading="true" />);
  expect(component.find("span").text()).toEqual("Loading...");
});