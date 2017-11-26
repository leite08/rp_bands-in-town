import React from "react";
import { shallow } from "enzyme";

import Artists from "./Artists";
import ArtistsSearch from "./ArtistsSearch";
import ArtistsView from "./ArtistsView";

it("renders without crashing", () => {
  const component = shallow(<Artists />);
  expect(component).toBeDefined();
});

it("should render <ArtistsSearch />", () => {
  const component = shallow(<Artists />);
  expect(component.find(ArtistsSearch)).toHaveLength(1);
});

it("should render <ArtistsView />", () => {
  const component = shallow(<Artists />);
  expect(component.find(ArtistsView)).toHaveLength(1);
});