import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";

const SolarRadiationChart = () => {
  const [hoverValue, setHoverValue] = useState(null);

  // Generate sample 24-hour data starting from current time
  const generateData = () => {
    const currentDate = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date(currentDate);
      date.setHours(currentDate.getHours() + i);
      return {
        timestamp: date,
        radiation:
          i >= 6 && i <= 18 ? Math.sin(((i - 6) * Math.PI) / 12) * 800 : 0,
      };
    });
  };

  const data = generateData();
  const currentHour = new Date();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      setHoverValue(value.toFixed(1));
      const date = payload[0].payload.timestamp;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="mb-0">{format(date, "MMM d, h:mm aa")}</p>
          <p className="mb-0">{`Irradiance: ${value.toFixed(1)} W/m²`}</p>
        </div>
      );
    }
    return null;
  };

  // Format X-axis ticks
  const formatXAxis = (tickItem) => {
    return format(new Date(tickItem), "h:mm aa");
  };

  const chartStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Container fluid className="mt-4">
      <Card className="p-4">
        <Row>
          <Col xs={12} className="position-relative">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 className="mb-0">Solar Radiation (GHI)</h4>
                <p className="text-muted mb-0">Clear skies, persisting</p>
              </div>
              <div className="text-end">
                <h5 className="mb-0">Forecast Irradiance</h5>
                <p className="text-primary mb-0 fs-4">
                  {hoverValue ||
                    data
                      .find(
                        (d) => d.timestamp.getHours() === currentHour.getHours()
                      )
                      ?.radiation.toFixed(1)}{" "}
                  W/m²
                </p>
              </div>
            </div>
            <div style={chartStyle}>
              <LineChart
                width={800}
                height={400}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                onMouseLeave={() => setHoverValue(null)}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatXAxis}
                  interval={2}
                  tick={{ fontSize: 12 }}
                  padding={{ left: 30, right: 30 }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 1000]}
                  ticks={[0, 200, 400, 600, 800, 1000]}
                  padding={{ top: 20, bottom: 20 }}
                  label={{
                    value: "Solar Radiation (W/m²)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                    dy: -40,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="radiation"
                  stroke="#f7931e"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#f7931e" }}
                />
                <ReferenceLine
                  x={currentHour}
                  stroke="#666"
                  strokeDasharray="3 3"
                  label={{
                    value: "Current Time",
                    position: "top",
                    fill: "#666",
                  }}
                />
              </LineChart>
            </div>
            <div className="text-center mt-2 text-muted">
              Local time ({Intl.DateTimeFormat().resolvedOptions().timeZone})
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default SolarRadiationChart;
