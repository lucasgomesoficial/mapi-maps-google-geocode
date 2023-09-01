// script para se conectar com a api do google
((parameters) => {
  let error;
  let element;
  let chaves;
  let all = window;
  let set = new Set();
  let params = new URLSearchParams();

  all = all["google"] || (all["google"] = {});

  let maps = all.maps || (all.maps = {});

  const setConfigMaps = () => {
    const createElement = new Promise(async (f, n) => {
      await (element = document.createElement("script"));
      params.set("libraries", [...set] + "");
      for (chaves in parameters)
        params.set(
          chaves.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
          parameters[chaves]
        );
      params.set("callback", "google" + ".maps." + "__ib__");
      element.src = "https://maps.googleapis.com/maps/api/js?" + params;
      maps["__ib__"] = f;
      element.onerror = () =>
        (error = n(
          Error("The Google Maps JavaScript API" + " could not load.")
        ));
      element.nonce = document.querySelector("script[nonce]")?.nonce || "";
      document.head.append(element);
    });

    return error || createElement;
  };

  const warningAlert = console.warn(
    "The Google Maps JavaScript API" + " only loads once. Ignoring:",
    parameters
  );

  const showMaps = (maps["importLibrary"] = (f, ...n) =>
    set.add(f) && setConfigMaps().then(() => maps["importLibrary"](f, ...n)));

  maps["importLibrary"] ? warningAlert : showMaps;
})({ key: "API_KEY", v: "beta" });
