import DeleteAccount from "./DeleteAccount";
import DisableAccountUser from "./DisableAccount";

function Options() {
  return (
    <>
      <div className="mt-9">
        <DisableAccountUser />
        <div className="my-4 border-b border-gray5 w-full" />
        <DeleteAccount />
      </div>
    </>
  );
}

export default Options;
