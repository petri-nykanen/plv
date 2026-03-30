import React from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Box,
  Group,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type PlvFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: number | undefined;
};

const defaultValues: PlvFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  age: undefined,
};

const PlvForm: React.FC = () => {
  const form = useForm<PlvFormValues>({
    initialValues: defaultValues,
    validate: {
      firstName: (value) =>
        value.trim().length === 0 ? "First name is required" : null,
      lastName: (value) =>
        value.trim().length === 0 ? "Last name is required" : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      age: (value) => (value && value < 1 ? "Age must be at least 1" : null),
    },
  });

  const handleSubmit = (values: PlvFormValues) => {
    console.log("Submitted PlvForm values:", values);
    form.reset();
  };

  return (
    <Box style={{ maxWidth: 520, margin: "0 auto", padding: 8 }}>
      <Paper p="lg" radius="md" shadow="sm">
        <Title order={3} mb="md">
          Generic Mantine Form
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...form.getInputProps("firstName")}
            required
          />

          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            mt="md"
            {...form.getInputProps("lastName")}
            required
          />

          <TextInput
            label="Email"
            placeholder="name@example.com"
            mt="md"
            {...form.getInputProps("email")}
            required
          />

          <NumberInput
            label="Age"
            placeholder="Enter age"
            mt="md"
            min={1}
            {...form.getInputProps("age")}
          />

          <Group justify="flex-end" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default PlvForm;
