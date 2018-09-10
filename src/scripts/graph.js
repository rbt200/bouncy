/*



*/

const getCirculeGraph = function(svgId, percent) {    
    const svgDoc = document.getElementById(svgId).contentDocument;
    const svg = svgDoc.getElementById('arc1');
    svg.setAttribute("d", describeArc(50, 50, 45, 0, getPercent(percent)));
    svgDoc.getElementById('arc1-percent').textContent = `${percent}%`;

    // convert % into degrees
    function getPercent(percent) {
        return ((360 / 100) * (100 - percent));
    }

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;   
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
    
    function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;       
    }
}