import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Button, Typography } from "@mui/material";

const Charts = () => {
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [nonConsumerChartData, setNonConsumerChartData] = useState([]);
  const [consumerChartData, setConsumerChartData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [index, setIndex] = useState(null);
  const token = localStorage.getItem("token");
  const offset = 13;
  const adjustedIndex = index !== null ? (index - offset) : null;

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

        const events = await axios.get("http://127.0.0.1:8000/api/events-data");
        setEventsData(events.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const downloadFile = () => {
    axios({
      url: "http://127.0.0.1:8000/api/xml",
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "file.xml";
        a.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
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
        text: "Cena w złotówkach",
      },
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              setIndex(this.x);
            },
          },
        },
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
    <div>
      <div>
        <Box display="flex" sx={{ marginLeft: 3 }}>
          <Box flex="1">
            <Typography variant="h4" component="p" sx={{ marginBlock: 3 }}>
              Towary nieżywnościone i usługi:
            </Typography>
            {nonConsumerChartData.map((option, index) => (
              <div key={index}>
                <label>
                  <Typography variant="body1" component="p">
                    <input
                      type="checkbox"
                      value={option.name}
                      checked={checkedProducts.includes(option.name)}
                      onChange={handleCheckboxChange}
                    />
                    {" " + option.name}
                  </Typography>
                </label>
              </div>
            ))}
          </Box>
          <Box flex="1">
            <Typography variant="h4" component="p" sx={{ marginBlock: 3 }}>
              Towary żywnościowe:
            </Typography>
            {consumerChartData.map((option, index) => (
              <div key={index}>
                <label>
                  <Typography variant="body1" component="p">
                    <input
                      type="checkbox"
                      value={option.name}
                      checked={checkedProducts.includes(option.name)}
                      onChange={handleCheckboxChange}
                    />
                    {" " + option.name}
                  </Typography>
                </label>
              </div>
            ))}
          </Box>
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 10, mb: 35, mt: 10 }}
            onClick={downloadFile}
          >
            Wyeksportuj Dane
          </Button>
        </Box>
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <Box sx={{ marginLeft: 3 }}>
        {console.log("index: "+index)}
        {console.log("adjusted index: "+adjustedIndex)}
        {adjustedIndex !== null && adjustedIndex >= 0 ? (
          <>
            <Typography variant="h6" component="p" sx={{ marginBlock: 3 }}>
              {eventsData[adjustedIndex].data}
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBlock: 3 }}>
              {eventsData[adjustedIndex].wydarzenia
                .substring(2, eventsData[adjustedIndex].wydarzenia.length - 2)
                .split('","')
                .map((item, index) => (
                  <Fragment key={index}>
                    <span>&#8226; </span>
                    {item.trim()}
                    <br />
                  </Fragment>
                ))}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" component="p">
            No data
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Charts;
