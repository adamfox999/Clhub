"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SailingQuickLinks.module.css";

export function SailingQuickLinks({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "navbar", "top", "inner")}
      tag="div"
    >
      <_Builtin.NavbarBrand
        className={_utils.cx(_styles, "brand")}
        options={{
          href: "#",
        }}
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "image")}
          width="auto"
          height="auto"
          loading="lazy"
          alt=""
          src="https://cdn.prod.website-files.com/6665c80fd12b155dd460e2c8/66683d4a0c14d15c2a5f7e1c_SWSCLogo.png"
        />
      </_Builtin.NavbarBrand>
      <_Builtin.Block className={_utils.cx(_styles, "section-icons")} tag="div">
        <_Builtin.Link
          className={_utils.cx(_styles, "menu-link-block")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "menu-icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M256%2016c0-7%204.5-13.2%2011.2-15.3s13.9%20.4%2017.9%206.1l224%20320c3.4%204.9%203.8%2011.3%201.1%2016.6s-8.2%208.6-14.2%208.6H272c-8.8%200-16-7.2-16-16V16zM212.1%2096.5c7%201.9%2011.9%208.2%2011.9%2015.5V336c0%208.8-7.2%2016-16%2016H80c-5.7%200-11-3-13.8-8s-2.9-11-.1-16l128-224c3.6-6.3%2011-9.4%2018-7.5zM5.7%20404.3C2.8%20394.1%2010.5%20384%2021.1%20384H554.9c10.6%200%2018.3%2010.1%2015.4%2020.3l-4%2014.3C550.7%20473.9%20500.4%20512%20443%20512H133C75.6%20512%2025.3%20473.9%209.7%20418.7l-4-14.3z%22%2F%3E%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-icon-label")}
            tag="div"
          >
            {"Sail"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "menu-link-block")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "menu-icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M192%2032c0-17.7%2014.3-32%2032-32H352c17.7%200%2032%2014.3%2032%2032V64h48c26.5%200%2048%2021.5%2048%2048V240l44.4%2014.8c23.1%207.7%2029.5%2037.5%2011.5%2053.9l-101%2092.6c-16.2%209.4-34.7%2015.1-50.9%2015.1c-19.6%200-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7%200c-17.1%2011.8-38%2020.3-59.2%2020.3c-16.2%200-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2%2011.5-53.9L96%20240V112c0-26.5%2021.5-48%2048-48h48V32zM160%20218.7l107.8-35.9c13.1-4.4%2027.3-4.4%2040.5%200L416%20218.7V128H160v90.7zM306.5%20421.9C329%20437.4%20356.5%20448%20384%20448c26.9%200%2055.4-10.8%2077.4-26.1l0%200c11.9-8.5%2028.1-7.8%2039.2%201.7c14.4%2011.9%2032.5%2021%2050.6%2025.2c17.2%204%2027.9%2021.2%2023.9%2038.4s-21.2%2027.9-38.4%2023.9c-24.5-5.7-44.9-16.5-58.2-25C449.5%20501.7%20417%20512%20384%20512c-31.9%200-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5%202.4-9.7%205.1-15.6%207.7c-19.8%209-48.5%2018.9-80.4%2018.9c-33%200-65.5-10.3-94.5-25.8c-13.4%208.4-33.7%2019.3-58.2%2025c-17.2%204-34.4-6.7-38.4-23.9s6.7-34.4%2023.9-38.4c18.1-4.2%2036.2-13.3%2050.6-25.2c11.1-9.4%2027.3-10.1%2039.2-1.7l0%200C136.7%20437.2%20165.1%20448%20192%20448c27.5%200%2055-10.6%2077.5-26.1c11.1-7.9%2025.9-7.9%2037%200z%22%2F%3E%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-icon-label")}
            tag="div"
          >
            {"Power"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "menu-link-block")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "menu-icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20576%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M180.5%20141.5C219.7%20108.5%20272.6%2080%20336%2080s116.3%2028.5%20155.5%2061.5c39.1%2033%2066.9%2072.4%2081%2099.8c4.7%209.2%204.7%2020.1%200%2029.3c-14.1%2027.4-41.9%2066.8-81%2099.8C452.3%20403.5%20399.4%20432%20336%20432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1%20379.6c-12.5%207.3-28.4%205.3-38.7-4.9S-3%20348.7%204.2%20336.1L50%20256%204.2%20175.9c-7.2-12.6-5-28.4%205.3-38.6s26.1-12.2%2038.7-4.9l89.7%2052.3c12.2-14.6%2026.5-29.4%2042.7-43.1zM448%20256a32%2032%200%201%200%20-64%200%2032%2032%200%201%200%2064%200z%22%2F%3E%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-icon-label")}
            tag="div"
          >
            {"Fish"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "menu-link-block")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "menu-icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E%3C!--!Font%20Awesome%20Free%206.5.2%20by%20%40fontawesome%20-%20https%3A%2F%2Ffontawesome.com%20License%20-%20https%3A%2F%2Ffontawesome.com%2Flicense%2Ffree%20Copyright%202024%20Fonticons%2C%20Inc.--%3E%3Cpath%20fill%3D%22CurrentColor%22%20d%3D%22M380.7%2048a48%2048%200%201%201%2096%200%2048%2048%200%201%201%20-96%200zM2.7%20268.9c6.1-11.8%2020.6-16.3%2032.4-10.2L232.7%20361.3l46.2-69.2-75.1-75.1c-14.6-14.6-20.4-33.9-18.4-52.1l108.8%2052%2039.3%2039.3c16.2%2016.2%2018.7%2041.5%206%2060.6L289.8%20391l128.7%2066.8c13.6%207.1%2029.8%207.2%2043.6%20.3l15.2-7.6c11.9-5.9%2026.3-1.1%2032.2%2010.7s1.1%2026.3-10.7%2032.2l-15.2%207.6c-27.5%2013.7-59.9%2013.5-87.2-.7L12.9%20301.3C1.2%20295.2-3.4%20280.7%202.7%20268.9zM118.9%2065.6L137%2074.2l8.7-17.4c4-7.9%2013.6-11.1%2021.5-7.2s11.1%2013.6%207.2%2021.5l-8.5%2016.9%2054.7%2026.2c1.5-.7%203.1-1.4%204.7-2.1l83.4-33.4c34.2-13.7%2072.8%204.2%2084.5%2039.2l17.1%2051.2%2052.1%2026.1c15.8%207.9%2022.2%2027.1%2014.3%2042.9s-27.1%2022.2-42.9%2014.3l-58.1-29c-11.4-5.7-20-15.7-24.1-27.8l-5.8-17.3-27.3%2012.1-6.8%203-6.7-3.2L151.5%20116.7l-9.2%2018.4c-4%207.9-13.6%2011.1-21.5%207.2s-11.1-13.6-7.2-21.5l9-18-17.6-8.4c-8-3.8-11.3-13.4-7.5-21.3s13.4-11.3%2021.3-7.5z%22%2F%3E%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "menu-icon-label")}
            tag="div"
          >
            {"Ski"}
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
