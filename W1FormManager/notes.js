
  <InputSection
    header="Type of Assembly"
    input={<List name="Assembly[Type]" options={data.Assembly.Type} />}
  >
    <InputGroup header="Tested Assembly Information">
      <Input label="Manufacturer">
        <List
          name="Assembly[Manufacturer]"
          options={data.Assembly.Manufacturer}
        />
      </Input>
      <Input label="Serial #">
        <input type="text" required maxLength="20" />
      </Input>
      <Input label="Location">
        <input type="text" required maxLength="45" />
      </Input>
      <Input label="Size">
        <List name="Assembly[Size]" options={data.Assembly.Size} />
      </Input>
      <Input label="Hazard">
        <input type="text" required maxLength="45" />
      </Input>
    </InputGroup>
    <InputGroup header="By-Pass Information">
      <Input label="Notification #" groupChildren={true}>
        <input
          type="text"
          required
          pattern="\d*"
          minLength="8"
          maxLength="8"
          size="8"
        />
        -
              <input
          type="text"
          required
          pattern="\d*"
          minLength="1"
          maxLength="1"
          size="1"
        />
      </Input>
      <Input label="Manufacturer">
        <List
          name="ByPass[Manufacturer]"
          options={data.Assembly.Manufacturer}
        />
      </Input>
      <Input label="Serial #">
        <input type="text" required maxLength="20" />
      </Input>
      <Input label="Size">
        <List name="ByPass[Size]" options={data.Assembly.Size} />
      </Input>
    </InputGroup>
  </InputSection>
  <InputSection header="Passing Backflow Assembly Test Results">
    <InputGroup header="Reduced Pressure / Detector Assembly">
      <Input label="Relief Valve" groupChildren={true}>
        <i>Opened at</i> <input type="text" required /> PSID
            </Input>
      <Input label="Valve #1" groupChildren={true}>
        <i>Closed tight at</i> <input type="text" required /> PSID
            </Input>
      <Input label="Valve #2" groupChildren={true}>
        <i>Closed tight at</i> <input type="text" required /> PSID
            </Input>
      <Input label="PVB/SPVB" groupChildren={true}>
        <i>Air Inlet Opened at</i> <input type="text" required /> PSI
            </Input>
      <Input label="PVB/SPVB" groupChildren={true}>
        <i>Supply Pipe Dia.</i> <input type="text" required /> in.
            </Input>
    </InputGroup>
    <InputGroup header="By-Pass Test Results">
      <Input label="Relief Valve" groupChildren={true}>
        <i>Opened at</i> <input type="text" required /> PSID
            </Input>
      <Input label="Valve #1" groupChildren={true}>
        <i>Closed tight at</i> <input type="text" required /> PSID
            </Input>
      <Input label="Valve #2" groupChildren={true}>
        <i>Closed tight at</i> <input type="text" required /> PSID
            </Input>
      <Input label="PVB/SPVB" groupChildren={true}>
        <i>Check Valve Held at</i> <input type="text" required /> PSI
            </Input>
      <Input label="PVB/SPVB" groupChildren={true}>
        <i>Gap 2 x dia., min 1”</i> <input type="text" required /> in.
            </Input>
    </InputGroup>
    <InputGroup header="Fireline Flushing Acknowledgement">
      <Input label="Date">
        <input type="date" required />
      </Input>
      <Input label="Name" groupChildren={true}>
        <input type="text" required />
      </Input>
    </InputGroup>
  </InputSection>