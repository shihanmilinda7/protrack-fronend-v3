"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WithRole } from "../components/common-comp/withRole";
import Spinner from "../dashboard/loading";
import { ListboxWrapper } from "../components/common-comp/nextui-input-fields/ListboxWrapper";
import NextListView from "../components/common-comp/nextui-input-fields/next-listview";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { COUNTRIES } from "../components/country-selector/countries";
import NextTextInputField from "../components/common-comp/nextui-input-fields/next-text-input-fields";
import { inputFieldValidation } from "../utils/utils";
import { toast } from "react-toastify";
import { webSocket } from "@/web-socket";
import ActivateOrganization from "../components/organization/active-organization";
import DatabaseMigration from "../components/organization/db-migration";

export default function SystemAdmin() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<any>("db-migration");
  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/"); // Redirect to login page if not authenticated
    return null;
  }
  return (
    <WithRole roles={["systemadmin"]}>
      <div className="w-full flex flex-col p-2">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="pending-organizations" title="Pending Organizations">
            <Card>
              <CardBody>
                <ActivateOrganization />
              </CardBody>
            </Card>
          </Tab>
          {/* <Tab key="active-organizations" title="Active Organizations">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab> */}
          <Tab key="db-migration" title="Database migrations">
            <Card>
              <CardBody>
                <DatabaseMigration />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </WithRole>
  );
}
