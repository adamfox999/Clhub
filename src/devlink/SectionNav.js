"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SectionNav.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-25":{"id":"e-25","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-26"}},"mediaQueries":["small","tiny"],"target":{"id":"99a0212d-3420-89f6-0401-11d55b7aa38b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"99a0212d-3420-89f6-0401-11d55b7aa38b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718444239801},"e-27":{"id":"e-27","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-28"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a89b5660-6264-a687-66c6-49f0c3a9b293","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a89b5660-6264-a687-66c6-49f0c3a9b293","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718444358998},"e-39":{"id":"e-39","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-7","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-40"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6665c80fd12b155dd460e2ce|bc022795-8eb3-4fdf-6620-ce1f14c952ff","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|bc022795-8eb3-4fdf-6620-ce1f14c952ff","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718445117566},"e-41":{"id":"e-41","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-7","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-42"}},"mediaQueries":["main"],"target":{"id":"6665c80fd12b155dd460e2ce|bc022795-8eb3-4fdf-6620-ce1f14c952ff","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|bc022795-8eb3-4fdf-6620-ce1f14c952ff","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718445117566},"e-43":{"id":"e-43","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-44"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"6665c80fd12b155dd460e2ce|930f6035-21a9-63e1-1c8b-cd7a8589f3a5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|930f6035-21a9-63e1-1c8b-cd7a8589f3a5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718445121134},"e-49":{"id":"e-49","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-8","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"6665c80fd12b155dd460e2ce|ea1f3ba6-0c9e-30d8-1f0a-2fab1bc5d3a4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|ea1f3ba6-0c9e-30d8-1f0a-2fab1bc5d3a4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718445123686},"e-51":{"id":"e-51","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-9","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-52"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"6665c80fd12b155dd460e2ce|4a292482-69da-1bda-13b1-268a64c4d58e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|4a292482-69da-1bda-13b1-268a64c4d58e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718445126055},"e-55":{"id":"e-55","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-10","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-56"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"6665c80fd12b155dd460e2ce|6c6ff8a3-2092-9870-3e4e-788c8b7e4ec4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|6c6ff8a3-2092-9870-3e4e-788c8b7e4ec4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718445288283},"e-63":{"id":"e-63","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-64"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1720567922474},"e-73":{"id":"e-73","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-9","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-74"}},"mediaQueries":["main"],"target":{"id":"6665c80fd12b155dd460e2ce|88f4f286-9b35-0867-31bf-394a68647012","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|88f4f286-9b35-0867-31bf-394a68647012","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721511967143},"e-75":{"id":"e-75","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-9","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-76"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6665c80fd12b155dd460e2ce|88f4f286-9b35-0867-31bf-394a68647012","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6665c80fd12b155dd460e2ce|88f4f286-9b35-0867-31bf-394a68647012","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721511967143}},"actionLists":{"a-11":{"id":"a-11","title":"Open Mobile L1 Menu","actionItemGroups":[{"actionItems":[{"id":"a-11-n-6","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu.l1","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","6e32c285-4fd6-5b4c-26b6-3e88f2951044"]},"widthValue":90,"widthUnit":"vw","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718444258188},"a-12":{"id":"a-12","title":"Close Mobile Menu L1","actionItemGroups":[{"actionItems":[{"id":"a-12-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"PARENT","selector":".menu.l1","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","6e32c285-4fd6-5b4c-26b6-3e88f2951044"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718444369313},"a-7":{"id":"a-7","title":"Show Club Menu","actionItemGroups":[{"actionItems":[{"id":"a-7-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-7-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-7-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-7-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-7-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}},{"id":"a-7-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-7-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-7-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-7-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-7-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-7-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":"none"}},{"id":"a-7-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":"none"}},{"id":"a-7-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":"none"}},{"id":"a-7-n-15","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":"none"}},{"id":"a-7-n-16","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":"block"}},{"id":"a-7-n-7","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthUnit":"AUTO","heightUnit":"PX","locked":false}}]},{"actionItems":[{"id":"a-7-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718111273122},"a-3":{"id":"a-3","title":"Show Sailing Menu","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-3-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-3-n-14","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-3-n-15","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-3-n-16","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}},{"id":"a-3-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-3-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-3-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-3-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-3-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-3-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":"none"}},{"id":"a-3-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":"none"}},{"id":"a-3-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":"none"}},{"id":"a-3-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":"none"}},{"id":"a-3-n-11","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":"block"}},{"id":"a-3-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthUnit":"AUTO","heightUnit":"PX","locked":false}}]},{"actionItems":[{"id":"a-3-n-12","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718111273122},"a-8":{"id":"a-8","title":"Show Power Menu","actionItemGroups":[{"actionItems":[{"id":"a-8-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-8-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-8-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-8-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-8-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}},{"id":"a-8-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-8-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-8-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-8-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-8-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-8-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":"none"}},{"id":"a-8-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":"none"}},{"id":"a-8-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":"none"}},{"id":"a-8-n-15","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":"none"}},{"id":"a-8-n-16","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":"block"}},{"id":"a-8-n-7","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthUnit":"AUTO","heightUnit":"PX","locked":false}}]},{"actionItems":[{"id":"a-8-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718111273122},"a-9":{"id":"a-9","title":"Show Fish Menu","actionItemGroups":[{"actionItems":[{"id":"a-9-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-9-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-9-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-9-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-9-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}},{"id":"a-9-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-9-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-9-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-9-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-9-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-9-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":"none"}},{"id":"a-9-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":"none"}},{"id":"a-9-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":"none"}},{"id":"a-9-n-15","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":"none"}},{"id":"a-9-n-16","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":"block"}},{"id":"a-9-n-7","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthUnit":"AUTO","heightUnit":"PX","locked":false}}]},{"actionItems":[{"id":"a-9-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718111273122},"a-10":{"id":"a-10","title":"Show Ski Menu","actionItemGroups":[{"actionItems":[{"id":"a-10-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-10-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-10-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-10-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-10-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}},{"id":"a-10-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-10-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":0,"unit":""}},{"id":"a-10-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":0,"unit":""}},{"id":"a-10-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":0,"unit":""}},{"id":"a-10-n-11","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.3,0,0.8,0.15],"duration":200,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-10-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.club","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","46803415-8a21-ff5f-f0e2-f6255493cb5e"]},"value":"none"}},{"id":"a-10-n-13","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.power","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","2d3a46de-d668-2dfb-82b0-d8e847bc760b"]},"value":"none"}},{"id":"a-10-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.fish","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","4364dabf-89e9-834f-c04c-70889d07d163"]},"value":"none"}},{"id":"a-10-n-15","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.sail","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","807b3871-72f4-4575-8a92-d113d70da1ca"]},"value":"none"}},{"id":"a-10-n-16","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":"block"}},{"id":"a-10-n-7","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".menu.l2","selectorGuids":["c499c896-62c9-86f4-7534-712bc14f9901","513d36fd-e4fc-b5b9-80ca-caa4b66eb9a2"]},"widthUnit":"AUTO","heightUnit":"PX","locked":false}}]},{"actionItems":[{"id":"a-10-n-17","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":[0.05,0.7,0.1,1],"duration":300,"target":{"selector":".l2-menu-content.ski","selectorGuids":["8d802fa7-88df-ecdb-8479-1f700d400aa3","b6c15cfa-fbdd-a483-6b24-4e76fc80fb43"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718111273122}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SectionNav({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "navbar", "top")} tag="nav">
      <_Builtin.Block
        className={_utils.cx(_styles, "mobile-top-nav-banner")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "menu-burger", "open")}
          data-w-id="99a0212d-3420-89f6-0401-11d55b7aa38b"
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224px%22%20viewBox%3D%220%20-960%20960%20960%22%20width%3D%2224px%22%20fill%3D%22CurrentColor%22%3E%3Cpath%20d%3D%22M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z%22%2F%3E%3C%2Fsvg%3E"
        />
        <_Builtin.Image
          className={_utils.cx(_styles, "mobile-brand-logo")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://cdn.prod.website-files.com/6665c80fd12b155dd460e2c8/66683d4a0c14d15c2a5f7e1c_SWSCLogo.png"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "menu", "l1")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "menu-burger-wrapper")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "menu-burger", "close")}
            data-w-id="a89b5660-6264-a687-66c6-49f0c3a9b293"
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%2224px%22%20viewBox%3D%220%20-960%20960%20960%22%20width%3D%2224px%22%20fill%3D%22Current%20Colour%22%3E%3Cpath%20d%3D%22M120-240v-80h520v80H120Zm664-40L584-480l200-200%2056%2056-144%20144%20144%20144-56%2056ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z%22%2F%3E%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "div-block-4")} tag="div">
          <_Builtin.NavbarBrand
            className={_utils.cx(_styles, "brand")}
            options={{
              href: "#",
            }}
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/6665c80fd12b155dd460e2c8/66683d4a0c14d15c2a5f7e1c_SWSCLogo.png"
            />
          </_Builtin.NavbarBrand>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "l1-dropdown")}
            tag="div"
            delay={0}
            hover={true}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "l1-dropdown-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "menu-icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M575.8%20255.5c0%2018-15%2032.1-32%2032.1h-32l.7%20160.2c0%202.7-.2%205.4-.5%208.1V472c0%2022.1-17.9%2040-40%2040H456c-1.1%200-2.2%200-3.3-.1c-1.4%20.1-2.8%20.1-4.2%20.1H416%20392c-22.1%200-40-17.9-40-40V448%20384c0-17.7-14.3-32-32-32H256c-17.7%200-32%2014.3-32%2032v64%2024c0%2022.1-17.9%2040-40%2040H160%20128.1c-1.5%200-3-.1-4.5-.2c-1.2%20.1-2.4%20.2-3.6%20.2H104c-22.1%200-40-17.9-40-40V360c0-.9%200-1.9%20.1-2.8V287.6H32c-18%200-32-14-32-32.1c0-9%203-17%2010-24L266.4%208c7-7%2015-8%2022-8s15%202%2021%207L564.8%20231.5c8%207%2012%2015%2011%2024z%22%2F%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Icon
                className={_utils.cx(_styles, "l1-dropdown-icon")}
                widget={{
                  type: "icon",
                  icon: "dropdown-toggle",
                }}
              />
              <_Builtin.Block tag="div">{"Club"}</_Builtin.Block>
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "l1-dropdown-list")}
              tag="nav"
            >
              <_Builtin.DropdownLink
                className={_utils.cx(_styles, "nav-link")}
                options={{
                  href: "#",
                }}
              >
                {"The Club"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                className={_utils.cx(_styles, "nav-link")}
                options={{
                  href: "#",
                }}
              >
                {"Projects & Fundraising"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                className={_utils.cx(_styles, "nav-link")}
                options={{
                  href: "#",
                }}
              >
                {"About"}
              </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "l1-dropdown")}
            tag="div"
            delay={0}
            hover={true}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "l1-dropdown-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "menu-icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M256%2016c0-7%204.5-13.2%2011.2-15.3s13.9%20.4%2017.9%206.1l224%20320c3.4%204.9%203.8%2011.3%201.1%2016.6s-8.2%208.6-14.2%208.6H272c-8.8%200-16-7.2-16-16V16zM212.1%2096.5c7%201.9%2011.9%208.2%2011.9%2015.5V336c0%208.8-7.2%2016-16%2016H80c-5.7%200-11-3-13.8-8s-2.9-11-.1-16l128-224c3.6-6.3%2011-9.4%2018-7.5zM5.7%20404.3C2.8%20394.1%2010.5%20384%2021.1%20384H554.9c10.6%200%2018.3%2010.1%2015.4%2020.3l-4%2014.3C550.7%20473.9%20500.4%20512%20443%20512H133C75.6%20512%2025.3%20473.9%209.7%20418.7l-4-14.3z%22%2F%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Icon
                className={_utils.cx(_styles, "l1-dropdown-icon")}
                widget={{
                  type: "icon",
                  icon: "dropdown-toggle",
                }}
              />
              <_Builtin.Block tag="div">{"Sail"}</_Builtin.Block>
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "l1-dropdown-list")}
              tag="nav"
            >
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Sailing Section"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Calendar"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"About"}
              </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "l1-dropdown")}
            tag="div"
            delay={0}
            hover={true}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "l1-dropdown-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "menu-icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M192%2032c0-17.7%2014.3-32%2032-32H352c17.7%200%2032%2014.3%2032%2032V64h48c26.5%200%2048%2021.5%2048%2048V240l44.4%2014.8c23.1%207.7%2029.5%2037.5%2011.5%2053.9l-101%2092.6c-16.2%209.4-34.7%2015.1-50.9%2015.1c-19.6%200-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7%200c-17.1%2011.8-38%2020.3-59.2%2020.3c-16.2%200-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2%2011.5-53.9L96%20240V112c0-26.5%2021.5-48%2048-48h48V32zM160%20218.7l107.8-35.9c13.1-4.4%2027.3-4.4%2040.5%200L416%20218.7V128H160v90.7zM306.5%20421.9C329%20437.4%20356.5%20448%20384%20448c26.9%200%2055.4-10.8%2077.4-26.1l0%200c11.9-8.5%2028.1-7.8%2039.2%201.7c14.4%2011.9%2032.5%2021%2050.6%2025.2c17.2%204%2027.9%2021.2%2023.9%2038.4s-21.2%2027.9-38.4%2023.9c-24.5-5.7-44.9-16.5-58.2-25C449.5%20501.7%20417%20512%20384%20512c-31.9%200-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5%202.4-9.7%205.1-15.6%207.7c-19.8%209-48.5%2018.9-80.4%2018.9c-33%200-65.5-10.3-94.5-25.8c-13.4%208.4-33.7%2019.3-58.2%2025c-17.2%204-34.4-6.7-38.4-23.9s6.7-34.4%2023.9-38.4c18.1-4.2%2036.2-13.3%2050.6-25.2c11.1-9.4%2027.3-10.1%2039.2-1.7l0%200C136.7%20437.2%20165.1%20448%20192%20448c27.5%200%2055-10.6%2077.5-26.1c11.1-7.9%2025.9-7.9%2037%200z%22%2F%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Icon
                className={_utils.cx(_styles, "l1-dropdown-icon")}
                widget={{
                  type: "icon",
                  icon: "dropdown-toggle",
                }}
              />
              <_Builtin.Block tag="div">{"Power"}</_Builtin.Block>
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "l1-dropdown-list")}
              tag="nav"
            >
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 1"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 2"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 3"}
              </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "l1-dropdown")}
            tag="div"
            delay={0}
            hover={true}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "l1-dropdown-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "menu-icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M380.7%2048a48%2048%200%201%201%2096%200%2048%2048%200%201%201%20-96%200zM2.7%20268.9c6.1-11.8%2020.6-16.3%2032.4-10.2L232.7%20361.3l46.2-69.2-75.1-75.1c-14.6-14.6-20.4-33.9-18.4-52.1l108.8%2052%2039.3%2039.3c16.2%2016.2%2018.7%2041.5%206%2060.6L289.8%20391l128.7%2066.8c13.6%207.1%2029.8%207.2%2043.6%20.3l15.2-7.6c11.9-5.9%2026.3-1.1%2032.2%2010.7s1.1%2026.3-10.7%2032.2l-15.2%207.6c-27.5%2013.7-59.9%2013.5-87.2-.7L12.9%20301.3C1.2%20295.2-3.4%20280.7%202.7%20268.9zM118.9%2065.6L137%2074.2l8.7-17.4c4-7.9%2013.6-11.1%2021.5-7.2s11.1%2013.6%207.2%2021.5l-8.5%2016.9%2054.7%2026.2c1.5-.7%203.1-1.4%204.7-2.1l83.4-33.4c34.2-13.7%2072.8%204.2%2084.5%2039.2l17.1%2051.2%2052.1%2026.1c15.8%207.9%2022.2%2027.1%2014.3%2042.9s-27.1%2022.2-42.9%2014.3l-58.1-29c-11.4-5.7-20-15.7-24.1-27.8l-5.8-17.3-27.3%2012.1-6.8%203-6.7-3.2L151.5%20116.7l-9.2%2018.4c-4%207.9-13.6%2011.1-21.5%207.2s-11.1-13.6-7.2-21.5l9-18-17.6-8.4c-8-3.8-11.3-13.4-7.5-21.3s13.4-11.3%2021.3-7.5z%22%2F%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Icon
                className={_utils.cx(_styles, "l1-dropdown-icon")}
                widget={{
                  type: "icon",
                  icon: "dropdown-toggle",
                }}
              />
              <_Builtin.Block tag="div">{"Ski"}</_Builtin.Block>
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "l1-dropdown-list")}
              tag="nav"
            >
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 1"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 2"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 3"}
              </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "l1-dropdown")}
            tag="div"
            delay={0}
            hover={true}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "l1-dropdown-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "menu-icons")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M180.5%20141.5C219.7%20108.5%20272.6%2080%20336%2080s116.3%2028.5%20155.5%2061.5c39.1%2033%2066.9%2072.4%2081%2099.8c4.7%209.2%204.7%2020.1%200%2029.3c-14.1%2027.4-41.9%2066.8-81%2099.8C452.3%20403.5%20399.4%20432%20336%20432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1%20379.6c-12.5%207.3-28.4%205.3-38.7-4.9S-3%20348.7%204.2%20336.1L50%20256%204.2%20175.9c-7.2-12.6-5-28.4%205.3-38.6s26.1-12.2%2038.7-4.9l89.7%2052.3c12.2-14.6%2026.5-29.4%2042.7-43.1zM448%20256a32%2032%200%201%200%20-64%200%2032%2032%200%201%200%2064%200z%22%2F%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Icon
                className={_utils.cx(_styles, "l1-dropdown-icon")}
                widget={{
                  type: "icon",
                  icon: "dropdown-toggle",
                }}
              />
              <_Builtin.Block tag="div">{"Angling"}</_Builtin.Block>
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "l1-dropdown-list")}
              tag="nav"
            >
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 1"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 2"}
              </_Builtin.DropdownLink>
              <_Builtin.DropdownLink
                options={{
                  href: "#",
                }}
              >
                {"Link 3"}
              </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
