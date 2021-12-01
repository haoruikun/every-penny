import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { Card } from "@mui/material";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SchoolIcon from "@mui/icons-material/School";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export default function Categories(props) {
  return (
    <TableContainer component={Card}>
      <Table aria-label="Total amount by categories">
        <TableHead sx={{ bgcolor: "primary.dark" }}>
          <TableRow>
            <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>
              Categories
            </TableCell>
            <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>
              Total Spending
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.chartdata.map((data, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ mr: 1, bgcolor: props.chartcolor[i] }}>
                    {props.chartlables[i] === "Home & Utilities" && (
                      <HomeIcon />
                    )}
                    {props.chartlables[i] === "Transportation" && (
                      <DirectionsBusIcon />
                    )}
                    {props.chartlables[i] === "Groceries" && (
                      <LocalGroceryStoreIcon />
                    )}
                    {props.chartlables[i] === "Health" && (
                      <HealthAndSafetyIcon />
                    )}
                    {props.chartlables[i] === "Dining" && <RestaurantIcon />}
                    {props.chartlables[i] === "Shopping" && <ShoppingBagIcon />}
                    {props.chartlables[i] === "Education" && <SchoolIcon />}
                    {props.chartlables[i] === "Others" && <QuestionMarkIcon />}
                  </Avatar>
                  {props.chartlables[i]}
                </Box>
              </TableCell>
              <TableCell>${data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
