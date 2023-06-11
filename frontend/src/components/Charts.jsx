import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Button, Typography } from "@mui/material";

const Charts = () => {
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [nonConsumerChartData, setNonConsumerChartData] = useState([]);
  const [consumerChartData, setConsumerChartData] = useState([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const nonConsumerProduct = await axios.get(
          "http://127.0.0.1:8000/api/non-consumer-product-chart-data"
        );
        setNonConsumerChartData(nonConsumerProduct.data);

        const consumerProduct = await axios.get(
          "http://127.0.0.1:8000/api/consumer-product-chart-data"
        );
        setConsumerChartData(consumerProduct.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const downloadFile = () => {
    axios({
      url: 'http://127.0.0.1:8000/api/xml',
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.xml';
        a.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  const options = {
    title: {
      text: "Wykres Ceny Towaru",
    },
    xAxis: {
      categories: [
        "2021 M01",
        "2021 M02",
        "2021 M03",
        "2021 M04",
        "2021 M05",
        "2021 M06",
        "2021 M07",
        "2021 M08",
        "2021 M09",
        "2021 M10",
        "2021 M11",
        "2021 M12",
        "2022 M01",
        "2022 M02",
        "2022 M03",
        "2022 M04",
        "2022 M05",
        "2022 M06",
        "2022 M07",
        "2022 M08",
        "2022 M09",
        "2022 M10",
        "2022 M11",
        "2022 M12",
        "2023 M01",
        "2023 M02",
        "2023 M03",
        "2023 M04",
      ],
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    series: checkedProducts.map((product) => ({
      name: product,
      data: productData[product]?.map(Number) || [],
    })),
  };

  const handleCheckboxChange = (e) => {
    const selectedProduct = e.target.value;
    if (e.target.checked) {
      setCheckedProducts([...checkedProducts, selectedProduct]);
    } else {
      setCheckedProducts(
        checkedProducts.filter((product) => product !== selectedProduct)
      );
    }
  };

  useEffect(() => {
    const selectedProductData = nonConsumerChartData
      .filter((data) => checkedProducts.includes(data.name))
      .concat(
        consumerChartData.filter((data) => checkedProducts.includes(data.name))
      );

    const mergedProductData = selectedProductData.reduce((result, data) => {
      result[data.name] = data.data;
      return result;
    }, {});

    setProductData(mergedProductData);
  }, [checkedProducts, nonConsumerChartData, consumerChartData]);

  return (
    <>
      <Box
        sx={{
          paddingInline: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" component="p" sx={{ marginBlock: 3 }}>
            Wybierz produkty:
          </Typography>
          {nonConsumerChartData.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  value={option.name}
                  checked={checkedProducts.includes(option.name)}
                  onChange={handleCheckboxChange}
                />
                {option.name}
              </label>
            </div>
          ))}
          {consumerChartData.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  value={option.name}
                  checked={checkedProducts.includes(option.name)}
                  onChange={handleCheckboxChange}
                />
                {option.name}
              </label>
            </div>
          ))}
        </Box>
        <Button color="secondary" variant="contained" sx={{ mr: 10, mt: 10 }} onClick={downloadFile}>
          Wyeksportuj Dane
        </Button>
      </Box>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default Charts;
