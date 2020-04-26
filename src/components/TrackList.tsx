import React from "react";
import ArtistLink from "./ArtistLink";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TrackList = ({ tracks }: any) => {
  const rowTemplate = (rowData: any, _: any) => {
    return <ArtistLink artists={rowData.artists} />;
  };
  return (
    <DataTable value={tracks} header="Track List">
      <Column field="name" header="Track" style={{ width: "50%" }} />
      <Column
        field="artists"
        header="Artists"
        body={rowTemplate}
        style={{ width: "50%" }}
      />
    </DataTable>
  );
};

export default TrackList;
