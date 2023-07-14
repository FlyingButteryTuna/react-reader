import { Icon, IconProps } from "@chakra-ui/icons";
import { ForwardedRef, forwardRef } from "react";

const SettingsIconVertical = forwardRef(
  (props: IconProps, ref: ForwardedRef<SVGSVGElement>) => (
    <Icon viewBox="0 0 160 304" {...props} ref={ref}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        d=" M66.323410,20.219456   C65.971504,25.317190 65.690697,29.967049 65.281525,34.605587   C65.008713,37.698383 66.429665,38.808922 69.367249,38.695503   C81.678650,38.220161 93.993240,37.827255 106.304497,37.348152   C109.629585,37.218754 112.949615,36.923820 116.267197,36.647583   C119.403824,36.386414 122.327461,35.966740 122.187737,40.786633   C122.076653,44.617905 122.076065,47.123131 116.847939,47.564655   C100.906326,48.910954 84.923996,49.198750 68.968010,50.066284   C65.409958,50.259731 64.054871,51.349876 63.777672,54.978832   C63.194859,62.608829 63.359219,70.195221 63.468121,78.265640   C69.698303,77.169464 75.351891,75.966652 81.064682,75.212234   C93.555473,73.562721 106.035797,73.660805 118.098633,77.696968   C135.093689,83.383423 147.994644,93.578888 151.224976,112.234177   C156.319122,141.653183 142.101730,163.121277 112.544212,171.729477   C103.334755,174.411621 101.183746,172.955963 99.562149,162.706207   C102.474281,160.822968 106.054726,160.708801 109.293831,159.624832   C118.219414,156.637939 126.948029,153.276123 133.022202,145.587997   C141.474594,134.889755 143.020416,122.747604 138.599152,110.223969   C134.399261,98.327332 125.476585,90.986656 113.385460,87.531563   C111.352005,89.770050 111.062279,92.329353 110.239784,94.636192   C101.168167,120.079247 85.931183,141.125656 64.894867,157.968582   C58.985069,162.700333 52.235313,165.920471 44.780956,167.604507   C28.381706,171.309280 14.425994,161.592117 11.663141,144.924500   C8.310991,124.701805 17.031233,109.345596 30.808353,95.975883   C35.844318,91.088829 41.622631,87.072609 47.958775,83.998779   C50.677517,82.679840 51.920696,80.940979 51.918091,77.817780   C51.912556,71.177628 52.313625,64.538185 52.464039,57.896553   C52.595772,52.079731 51.711769,51.175991 46.032391,51.142590   C39.533508,51.104366 33.030407,50.983513 26.536581,51.164940   C22.110523,51.288593 21.859585,48.658485 21.841326,45.330582   C21.822550,41.907852 22.317324,39.521400 26.671057,39.658165   C33.829514,39.883034 41.005501,39.548565 48.164059,39.771824   C52.184799,39.897221 53.713963,38.600197 53.798820,34.393681   C53.922539,28.260605 54.686562,22.125231 55.452297,16.025318   C56.024414,11.467757 59.042854,9.906932 64.523384,10.961406   C68.971863,11.817310 66.683929,14.922963 66.580460,17.282175   C66.544044,18.112291 66.422562,18.938679 66.323410,20.219456  M36.978325,104.471191   C26.752205,114.429718 20.137529,125.802505 22.220308,140.815796   C23.450735,149.685089 29.796810,155.630722 38.695660,155.667206   C45.272831,155.694153 50.904804,153.033417 56.269138,149.454575   C58.715721,147.822327 59.459507,146.231430 58.536156,143.280502   C55.496094,133.564835 54.500900,123.472893 53.662743,113.376816   C53.149872,107.199051 52.703335,101.015770 52.195381,94.424538   C46.026440,96.614899 41.692425,100.195770 36.978325,104.471191  M69.840515,88.357292   C64.811340,88.903526 62.783119,91.463791 63.285786,96.697060   C64.445274,108.768501 65.057159,120.903503 67.656746,132.786240   C68.071404,134.681641 67.776352,137.274399 70.351448,138.210358   C80.518776,130.578705 99.205734,97.855240 100.129189,85.747581   C90.121658,84.527786 80.358925,86.005295 69.840515,88.357292  z"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        d=" M119.191544,291.179382   C114.090469,295.958038 108.351387,298.929993 102.064980,300.823730   C95.767715,302.720703 94.655136,301.908051 93.186478,294.741669   C97.760025,293.007202 102.517235,291.557770 106.957214,289.442505   C115.176193,285.526794 119.428726,278.888763 119.796867,269.646545   C120.182442,259.966644 115.931618,253.015823 107.875420,248.161194   C102.930626,245.181488 102.091568,245.589615 100.069115,250.942978   C93.622795,268.006256 83.650131,282.468475 68.632057,293.137970   C66.882637,294.380890 64.955414,295.463013 62.967381,296.264313   C56.079872,299.040314 49.038799,300.475861 42.621666,295.383057   C35.817539,289.983154 34.117344,282.269165 35.266487,274.215363   C37.163334,260.921295 45.063026,251.387054 56.421322,244.918076   C60.711914,242.474442 62.028095,239.667053 61.981415,235.030350   C61.852322,222.206680 62.012287,222.205597 48.968693,222.122726   C47.969501,222.116379 46.970165,222.074020 45.971313,222.085327   C43.519314,222.113052 42.286919,220.949936 42.253998,218.464020   C42.219902,215.888779 43.246574,214.300064 45.992287,214.255661   C49.987621,214.191055 53.996410,213.953537 57.975323,214.192230   C61.247852,214.388565 62.988426,213.676620 62.939770,209.966476   C62.898567,206.825241 63.534504,203.680939 63.727501,200.529236   C63.935394,197.134171 65.273811,195.368713 69.020752,195.640274   C73.276535,195.948669 71.960747,198.683243 71.745644,201.045792   C70.317139,216.735474 70.631775,213.868240 82.667557,213.163605   C89.644951,212.755142 96.629051,212.462234 103.607887,212.076797   C105.761803,211.957840 107.727623,212.027573 107.974556,214.828827   C108.208855,217.486588 107.563782,219.326797 104.339035,219.499634   C94.872208,220.007004 85.420204,220.913589 75.949196,221.163269   C71.854874,221.271210 69.899910,222.107513 69.848495,226.652954   C69.801956,230.766113 69.105042,234.864838 69.879288,239.293396   C74.476830,238.544815 78.839096,237.669678 83.243324,237.150055   C94.100914,235.869064 104.399452,237.393509 114.025703,243.042068   C130.839859,252.908371 130.875565,275.821075 121.938515,287.799774   C121.142487,288.866699 120.273262,289.879028 119.191544,291.179382  M65.312401,278.816956   C62.884277,269.763641 63.421616,260.248260 61.574722,250.072678   C51.881588,256.325562 44.668835,263.079193 42.681992,273.892029   C41.707870,279.193420 42.302639,284.486542 47.052807,287.861511   C51.738605,291.190704 56.802608,290.147339 61.735695,287.762085   C65.341461,286.018616 67.348206,283.747040 65.312401,278.816956  M76.206039,276.449371   C84.359314,267.318878 89.731834,256.721069 93.814156,244.656769   C85.862083,243.882599 79.061172,244.772873 72.377594,246.835159   C70.640984,247.371002 69.363548,248.521500 69.546532,250.440765   C70.346764,258.834198 70.569908,267.306061 72.593925,275.542145   C72.956573,277.017822 73.492073,279.282654 76.206039,276.449371  z"
      />
    </Icon>
  )
);

export default SettingsIconVertical;