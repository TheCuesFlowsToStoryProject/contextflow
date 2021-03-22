import { render, screen } from "@testing-library/react";
import React, { useState } from "react";
import WordPhrase from "../components/word-phrase/index";
import CreatableSelect from "react-select/creatable";

jest.mock("react");
describe("WordPhrase", () => {
  //Arrange
  useState.mockReturnValue({
    value: {
      _id: "6054594b17fd27309484817e",
      wp: "tiger",
      __v: 0,
      owner: "demo",
      label: "tiger",
    },
  });

  render();

  // <WordPhrase
  //   name={"hh"}
  //   setModel={setModel}
  //   setDomain={setDomain}
  //   setFlow={setFlow}
  //   isMulti={false}
  //   setAddModulesData={false}
  //   heading={"ghh"}
  // />
});

// import React from "react";
// import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import ContextFlow from "../components/contextflow/index";

// describe("<NewMessageForm />", () => {
//   let getByTestId;

//   describe("clicking the send button", () => {
//     beforeEach(async () => {
//       ({ getByTestId } = render(<ContextFlow />));

//       await userEvent.type(getByTestId("messageText"), "New message");
//       userEvent.click(getByTestId("sendButton"));
//     });

//     it("clears the text field", () => {
//       expect(getByTestId("messageText").value).toEqual("");
//     });
//   });
// });
