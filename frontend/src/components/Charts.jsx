import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Charts = () => {
  const [product, setProduct] = useState("");
  const [productData, setProductData] = useState([]);
  const [nonConsumerChartData, setNonConsumerChartData] = useState([]);
  const [consumerChartData, setConsumerChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nonConsumerProduct = await axios.get('http://127.0.0.1:8000/api/non-consumer-product-chart-data');
        setNonConsumerChartData(nonConsumerProduct.data);

        const consumerProduct = await axios.get('http://127.0.0.1:8000/api/consumer-product-chart-data');
        setConsumerChartData(consumerProduct.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
    series: [{
      name: product,
      data: productData.map(Number)
    }]
  };

  const handleChange = (e) => {
    setProduct(e.target.value);

    const selectedProductData = nonConsumerChartData.find(data => data.name === e.target.value)
      || consumerChartData.find(data => data.name === e.target.value);

    setProductData(selectedProductData ? selectedProductData.data : []);
  };

  return (
    <div>
      <div>
        <h4>Select a product:</h4>
        <select
          id="product"
          name="Product"
          value={product}
          onChange={handleChange}
        >
          <option value="">-- Select a product --</option>
          {nonConsumerChartData.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
          {consumerChartData.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Charts;
