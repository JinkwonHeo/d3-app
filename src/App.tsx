import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal } from 'd3';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line<number>()
      .x((data, index) => index * 50)
      .y((value) => 150 - value)
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', (value) => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
    // svg
    //   .selectAll('circle')
    //   .data(data)
    //   .join('circle')
    //   .attr('r', (value) => value)
    //   .attr('cx', (value) => value * 2)
    //   .attr('cy', (value) => value * 2)
    //   .attr('stroke', 'red');
  }, [data]);
  return (
    <>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>update data</button>
      <button onClick={() => setData(data.filter((value) => value <= 35))}>filter data</button>
    </>
  );
}

export default App;
