import { useState } from "react";
import { Outlet } from "react-router-dom";

function Index() {
  const [refreshFlag, setRefreshFlag] = useState(0);

  const doRefresh = () => {
    setRefreshFlag((prev) => prev + 1);
  };
  return (
    <div>
      {<Outlet context={{ doRefresh, refreshFlag }} key={refreshFlag} />}
    </div>
  );
}

export default Index;
