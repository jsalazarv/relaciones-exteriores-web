<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-table title="Empleados" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:top-right>
          <q-btn
            color="dark"
            icon-right="archive"
            label="Exportar"
            size="sm"
            no-caps
            style="border-radius: 8px; margin-right: 0.3rem"
            @click="onExport"
            :loading="isRefetchingReport"
            :disable="isRefetchingReport"
          />
          <q-btn
            color="dark"
            icon-right="add"
            label="Agregar"
            size="sm"
            no-caps
            style="border-radius: 8px"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              size="sm"
              color="grey"
              icon="edit"
              @click="onEdit(props.row)"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              size="sm"
              color="grey"
              icon="delete"
              @click="onDelete(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useEmployee, useEmployeeReport } from 'src/composables/useEmployee';
import { IEmployee } from 'src/entities/employee';

const { data } = useEmployee();
const {
  data: reportData,
  refetch: refetchReport,
  isRefetching: isRefetchingReport,
} = useEmployeeReport();

interface IColum {
  name: string;
  required?: boolean;
  label: string;
  align?: 'left' | 'right' | 'center';
  field: (row: Partial<IEmployee>) => any;
  sortable?: boolean;
}

const columns: IColum[] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row: Partial<IEmployee>) => row.name,
    sortable: true,
  },
  {
    name: 'last_name',
    align: 'left',
    label: 'Apellido',
    field: (row: Partial<IEmployee>) => row.last_name,
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Correo',
    field: (row: Partial<IEmployee>) => row.email,
  },
  {
    name: 'birthday',
    align: 'left',
    label: 'Fecha de nacimiento',
    field: (row: Partial<IEmployee>) => row.birthday,
    sortable: true,
  },
  {
    name: 'gender',
    align: 'left',
    label: 'Genero',
    field: (row: Partial<IEmployee>) =>
      row.gender === 'male' ? 'Masculino' : 'Femenino',
    sortable: true,
  },
  {
    name: 'rfc',
    align: 'left',
    label: 'RFC',
    field: (row: Partial<IEmployee>) => row.rfc,
    sortable: true,
  },
  {
    name: 'ssn',
    align: 'left',
    label: 'NSS',
    field: (row: Partial<IEmployee>) => row.ssn,
    sortable: true,
  },
  {
    name: 'salary',
    align: 'left',
    label: 'Salario',
    field: (row: Partial<IEmployee>) => row.salary,
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Acciones',
    field: () => 'actions',
  },
];

const rows = data?.value?.data.map((employee: IEmployee) => ({
  name: employee.name,
  last_name: employee.last_name,
  email: employee.email,
  birthday: employee.birthday,
  gender: employee.gender,
  rfc: employee.rfc,
  ssn: employee.ssn,
  salary: employee.salary,
}));

const onExport = () => {
  console.log('[EXPORT EXCEL]'); //TODO: Implement export
};

const onEdit = (employee: IEmployee) => {
  console.log('[EDIT EMPLOYEE]', employee);
};

const onDelete = (employee: IEmployee) => {
  console.log('[DELETE EMPLOYEE]', employee);
};
</script>
