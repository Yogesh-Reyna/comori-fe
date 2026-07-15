import { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/form/input";
import Modal from "../../components/modal";
import { testModalKey } from "../../constants/modalKeys";
import { closeModal, openModal } from "../../zustand-store/modal-store/actions";

function Dashboard() {
  const [name, setName] = useState("");
  return (
    <div>
      <Input
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h1>Dashboard Page</h1>
      <Button
        label="Click me"
        isFullWid={false}
        onClick={() => console.log("clicked")}
      />

      <Button
        label="Open Modal"
        isFullWid={false}
        onClick={() => openModal(testModalKey)}
      />
      {/* <Button label="Close Modal" onClick={() => closeModal(testModalKey)} /> */}

      <Modal title="Test Modal" width="50%" modalKey={testModalKey}>
        Hi
      </Modal>
    </div>
  );
}

export default Dashboard;
