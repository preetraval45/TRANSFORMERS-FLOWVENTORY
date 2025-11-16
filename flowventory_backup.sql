--
-- PostgreSQL database dump
--

\restrict lL85SaTZolX06JUAe9CnFLtuyKaikDGrDiB5PymfBNA0bOImyRxDu1E4JhrMwUS

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inventory_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory_items (
    id integer NOT NULL,
    item_id character varying NOT NULL,
    sku character varying,
    description character varying,
    vendor character varying,
    quantity integer,
    zone character varying,
    aisle character varying,
    rack character varying,
    shelf character varying,
    bin character varying,
    storage_location character varying,
    category character varying,
    weight character varying,
    dimensions character varying,
    barcode character varying,
    status character varying NOT NULL,
    last_shipment_id integer
);


ALTER TABLE public.inventory_items OWNER TO postgres;

--
-- Name: inventory_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_items_id_seq OWNER TO postgres;

--
-- Name: inventory_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_items_id_seq OWNED BY public.inventory_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    client_id integer NOT NULL,
    status character varying NOT NULL,
    notes text,
    items json NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: packing_slips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packing_slips (
    id integer NOT NULL,
    filename character varying NOT NULL,
    content_type character varying NOT NULL,
    file_url character varying,
    shipment_id integer,
    inventory_item_id integer,
    uploaded_by integer NOT NULL
);


ALTER TABLE public.packing_slips OWNER TO postgres;

--
-- Name: packing_slips_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packing_slips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packing_slips_id_seq OWNER TO postgres;

--
-- Name: packing_slips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packing_slips_id_seq OWNED BY public.packing_slips.id;


--
-- Name: shipments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipments (
    id integer NOT NULL,
    our_name character varying NOT NULL,
    our_address character varying NOT NULL,
    bill_to character varying,
    ship_to character varying,
    invoice_number character varying NOT NULL,
    invoice_date date NOT NULL,
    due_date date,
    ship_via character varying,
    order_number character varying,
    qty integer NOT NULL,
    item_type character varying NOT NULL,
    item_desc character varying,
    order_id integer
);


ALTER TABLE public.shipments OWNER TO postgres;

--
-- Name: shipments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shipments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipments_id_seq OWNER TO postgres;

--
-- Name: shipments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shipments_id_seq OWNED BY public.shipments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    firstname character varying NOT NULL,
    role character varying NOT NULL,
    password character varying NOT NULL,
    assigned_pages json
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: inventory_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_items ALTER COLUMN id SET DEFAULT nextval('public.inventory_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: packing_slips id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packing_slips ALTER COLUMN id SET DEFAULT nextval('public.packing_slips_id_seq'::regclass);


--
-- Name: shipments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments ALTER COLUMN id SET DEFAULT nextval('public.shipments_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: inventory_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_items (id, item_id, sku, description, vendor, quantity, zone, aisle, rack, shelf, bin, storage_location, category, weight, dimensions, barcode, status, last_shipment_id) FROM stdin;
101	SWITCH-001	C9300-48P	Cisco Catalyst 9300 48-Port Switch	Cisco	5	A	1	3	2	\N	A-1-3-2	Network Equipment	\N	\N	\N	pending_inspection	\N
102	SERVER-001	PE-R740	Dell PowerEdge R740 Server	Dell	2	B	2	1	1	\N	B-2-1-1	Servers	\N	\N	\N	ready_for_deployment	\N
103	AP-001	MR46-HW	Cisco Meraki MR46 Access Point	Cisco	10	A	3	2	1	\N	A-3-2-1	Network Equipment	\N	\N	\N	installed	\N
104	ROUTER-001	ISR4331	Cisco ISR 4331 Router	Cisco	2	A	1	5	3	\N	A-1-5-3	Network Equipment	\N	\N	\N	pending_inspection	\N
105	RACK-001	RK42U	StarTech 42U Server Rack	StarTech	2	C	1	1	1	\N	C-1-1-1	Infrastructure	\N	\N	\N	ready_for_deployment	\N
106	ITEM-0006	SKU-0006	Fortinet Semiconductors Component 6	Fortinet	49	D	5	6	3	\N	D-5-6-3	Semiconductors	54kg	49x41x25cm	\N	installed	\N
107	ITEM-0007	SKU-0007	HP Servers Component 7	HP	10	E	3	1	4	\N	E-3-1-4	Servers	100kg	34x23x49cm	\N	ready_for_deployment	\N
108	ITEM-0008	SKU-0008	Cisco Semiconductors Component 8	Cisco	33	B	5	1	3	\N	B-5-1-3	Semiconductors	48kg	37x13x17cm	\N	ready_for_deployment	\N
109	ITEM-0009	SKU-0009	VMware Semiconductors Component 9	VMware	43	C	3	2	3	\N	C-3-2-3	Semiconductors	82kg	15x45x26cm	\N	installed	\N
110	ITEM-0010	SKU-0010	Cisco Cables Component 10	Cisco	10	D	2	5	3	\N	D-2-5-3	Cables	26kg	10x11x32cm	\N	pending_inspection	\N
111	ITEM-0011	SKU-0011	Palo Alto PCB Components Component 11	Palo Alto	26	D	1	2	1	\N	D-1-2-1	PCB Components	95kg	35x29x32cm	\N	installed	\N
112	ITEM-0012	SKU-0012	Dell Infrastructure Component 12	Dell	42	B	5	7	1	\N	B-5-7-1	Infrastructure	59kg	14x33x41cm	\N	ready_for_deployment	\N
113	ITEM-0013	SKU-0013	Microsoft Passive Components Component 13	Microsoft	16	C	3	10	2	\N	C-3-10-2	Passive Components	54kg	33x22x50cm	\N	installed	\N
114	ITEM-0014	SKU-0014	Fortinet Passive Components Component 14	Fortinet	33	A	5	3	3	\N	A-5-3-3	Passive Components	25kg	29x26x50cm	\N	pending_inspection	\N
115	ITEM-0015	SKU-0015	VMware Storage Component 15	VMware	44	A	4	10	5	\N	A-4-10-5	Storage	86kg	14x10x14cm	\N	installed	\N
116	ITEM-0016	SKU-0016	Lenovo Storage Component 16	Lenovo	18	C	5	4	1	\N	C-5-4-1	Storage	86kg	14x19x27cm	\N	pending_inspection	\N
117	ITEM-0017	SKU-0017	HP Cables Component 17	HP	49	C	3	1	2	\N	C-3-1-2	Cables	55kg	35x17x28cm	\N	pending_inspection	\N
118	ITEM-0018	SKU-0018	Lenovo Network Equipment Component 18	Lenovo	30	E	4	9	1	\N	E-4-9-1	Network Equipment	73kg	46x47x43cm	\N	installed	\N
119	ITEM-0019	SKU-0019	Dell Semiconductors Component 19	Dell	30	C	3	3	3	\N	C-3-3-3	Semiconductors	2kg	13x10x34cm	\N	pending_inspection	\N
120	ITEM-0020	SKU-0020	Lenovo Cables Component 20	Lenovo	31	C	2	1	4	\N	C-2-1-4	Cables	75kg	36x24x33cm	\N	pending_inspection	\N
121	ITEM-0021	SKU-0021	Aruba Cables Component 21	Aruba	6	B	4	6	4	\N	B-4-6-4	Cables	7kg	45x30x22cm	\N	ready_for_deployment	\N
122	ITEM-0022	SKU-0022	VMware Network Equipment Component 22	VMware	6	E	2	1	5	\N	E-2-1-5	Network Equipment	36kg	15x31x46cm	\N	installed	\N
123	ITEM-0023	SKU-0023	Palo Alto Cables Component 23	Palo Alto	45	E	3	8	5	\N	E-3-8-5	Cables	57kg	28x38x13cm	\N	installed	\N
124	ITEM-0024	SKU-0024	Lenovo Cables Component 24	Lenovo	22	B	5	3	3	\N	B-5-3-3	Cables	86kg	14x48x47cm	\N	pending_inspection	\N
125	ITEM-0025	SKU-0025	VMware Passive Components Component 25	VMware	6	B	2	9	5	\N	B-2-9-5	Passive Components	15kg	48x25x37cm	\N	ready_for_deployment	\N
126	ITEM-0026	SKU-0026	Fortinet Servers Component 26	Fortinet	1	E	3	1	3	\N	E-3-1-3	Servers	22kg	18x46x34cm	\N	ready_for_deployment	\N
127	ITEM-0027	SKU-0027	Dell Infrastructure Component 27	Dell	34	D	1	8	2	\N	D-1-8-2	Infrastructure	94kg	31x28x19cm	\N	installed	\N
128	ITEM-0028	SKU-0028	Lenovo Servers Component 28	Lenovo	13	B	2	5	1	\N	B-2-5-1	Servers	4kg	25x48x29cm	\N	installed	\N
129	ITEM-0029	SKU-0029	Palo Alto Infrastructure Component 29	Palo Alto	2	C	2	2	1	\N	C-2-2-1	Infrastructure	91kg	22x38x43cm	\N	pending_inspection	\N
130	ITEM-0030	SKU-0030	Juniper Cables Component 30	Juniper	28	A	2	4	3	\N	A-2-4-3	Cables	63kg	49x29x21cm	\N	ready_for_deployment	\N
131	ITEM-0031	SKU-0031	HP PCB Components Component 31	HP	21	D	5	1	1	\N	D-5-1-1	PCB Components	83kg	21x16x22cm	\N	pending_inspection	\N
132	ITEM-0032	SKU-0032	Lenovo Infrastructure Component 32	Lenovo	40	E	3	9	3	\N	E-3-9-3	Infrastructure	33kg	49x29x35cm	\N	ready_for_deployment	\N
133	ITEM-0033	SKU-0033	Aruba Infrastructure Component 33	Aruba	28	D	5	5	1	\N	D-5-5-1	Infrastructure	25kg	18x22x36cm	\N	pending_inspection	\N
134	ITEM-0034	SKU-0034	Aruba Cables Component 34	Aruba	12	C	1	3	5	\N	C-1-3-5	Cables	91kg	17x19x40cm	\N	pending_inspection	\N
135	ITEM-0035	SKU-0035	HP Storage Component 35	HP	4	A	4	6	4	\N	A-4-6-4	Storage	73kg	14x19x37cm	\N	installed	\N
136	ITEM-0036	SKU-0036	Juniper Infrastructure Component 36	Juniper	7	B	5	5	2	\N	B-5-5-2	Infrastructure	31kg	32x16x16cm	\N	pending_inspection	\N
137	ITEM-0037	SKU-0037	Cisco Storage Component 37	Cisco	15	B	3	5	4	\N	B-3-5-4	Storage	81kg	44x12x26cm	\N	ready_for_deployment	\N
138	ITEM-0038	SKU-0038	VMware Network Equipment Component 38	VMware	22	A	2	1	3	\N	A-2-1-3	Network Equipment	28kg	29x46x30cm	\N	ready_for_deployment	\N
139	ITEM-0039	SKU-0039	HP Semiconductors Component 39	HP	8	A	2	7	1	\N	A-2-7-1	Semiconductors	75kg	21x32x34cm	\N	installed	\N
140	ITEM-0040	SKU-0040	Microsoft PCB Components Component 40	Microsoft	5	B	3	2	2	\N	B-3-2-2	PCB Components	84kg	33x29x17cm	\N	installed	\N
141	ITEM-0041	SKU-0041	Fortinet Infrastructure Component 41	Fortinet	45	C	3	2	2	\N	C-3-2-2	Infrastructure	7kg	25x50x39cm	\N	pending_inspection	\N
142	ITEM-0042	SKU-0042	Juniper Semiconductors Component 42	Juniper	13	D	5	8	2	\N	D-5-8-2	Semiconductors	6kg	33x12x40cm	\N	installed	\N
143	ITEM-0043	SKU-0043	Microsoft Storage Component 43	Microsoft	14	E	3	6	1	\N	E-3-6-1	Storage	100kg	17x41x22cm	\N	installed	\N
144	ITEM-0044	SKU-0044	Dell Storage Component 44	Dell	8	D	3	8	5	\N	D-3-8-5	Storage	8kg	33x28x14cm	\N	ready_for_deployment	\N
145	ITEM-0045	SKU-0045	Palo Alto Network Equipment Component 45	Palo Alto	50	D	4	2	4	\N	D-4-2-4	Network Equipment	14kg	33x36x18cm	\N	pending_inspection	\N
146	ITEM-0046	SKU-0046	HP Infrastructure Component 46	HP	17	A	1	2	1	\N	A-1-2-1	Infrastructure	92kg	23x10x45cm	\N	ready_for_deployment	\N
147	ITEM-0047	SKU-0047	Fortinet PCB Components Component 47	Fortinet	7	A	2	7	5	\N	A-2-7-5	PCB Components	12kg	43x11x30cm	\N	pending_inspection	\N
148	ITEM-0048	SKU-0048	Cisco Passive Components Component 48	Cisco	30	A	3	3	1	\N	A-3-3-1	Passive Components	38kg	21x13x24cm	\N	ready_for_deployment	\N
149	ITEM-0049	SKU-0049	Dell Passive Components Component 49	Dell	22	E	5	6	5	\N	E-5-6-5	Passive Components	80kg	50x17x21cm	\N	pending_inspection	\N
150	ITEM-0050	SKU-0050	Fortinet Servers Component 50	Fortinet	24	D	3	10	3	\N	D-3-10-3	Servers	32kg	15x20x30cm	\N	pending_inspection	\N
151	ITEM-0051	SKU-0051	Dell PCB Components Component 51	Dell	14	D	5	10	5	\N	D-5-10-5	PCB Components	96kg	37x27x20cm	\N	pending_inspection	\N
152	ITEM-0052	SKU-0052	Cisco Cables Component 52	Cisco	25	A	3	9	5	\N	A-3-9-5	Cables	6kg	50x24x42cm	\N	ready_for_deployment	\N
153	ITEM-0053	SKU-0053	Dell Storage Component 53	Dell	13	E	4	3	2	\N	E-4-3-2	Storage	90kg	47x41x34cm	\N	installed	\N
154	ITEM-0054	SKU-0054	Palo Alto Storage Component 54	Palo Alto	10	D	4	10	4	\N	D-4-10-4	Storage	56kg	42x31x15cm	\N	installed	\N
155	ITEM-0055	SKU-0055	Aruba Infrastructure Component 55	Aruba	33	A	3	10	2	\N	A-3-10-2	Infrastructure	70kg	21x33x40cm	\N	pending_inspection	\N
156	ITEM-0056	SKU-0056	VMware Network Equipment Component 56	VMware	30	B	3	9	4	\N	B-3-9-4	Network Equipment	86kg	46x29x44cm	\N	installed	\N
157	ITEM-0057	SKU-0057	Juniper PCB Components Component 57	Juniper	18	E	2	7	2	\N	E-2-7-2	PCB Components	66kg	17x43x15cm	\N	ready_for_deployment	\N
158	ITEM-0058	SKU-0058	Microsoft Storage Component 58	Microsoft	36	A	3	5	3	\N	A-3-5-3	Storage	39kg	20x45x41cm	\N	installed	\N
159	ITEM-0059	SKU-0059	VMware Infrastructure Component 59	VMware	39	B	5	2	2	\N	B-5-2-2	Infrastructure	7kg	31x44x49cm	\N	installed	\N
160	ITEM-0060	SKU-0060	Palo Alto Passive Components Component 60	Palo Alto	37	E	2	3	3	\N	E-2-3-3	Passive Components	66kg	21x40x34cm	\N	pending_inspection	\N
161	ITEM-0061	SKU-0061	Lenovo Infrastructure Component 61	Lenovo	38	E	3	4	2	\N	E-3-4-2	Infrastructure	97kg	21x16x30cm	\N	installed	\N
162	ITEM-0062	SKU-0062	Fortinet PCB Components Component 62	Fortinet	17	C	3	7	3	\N	C-3-7-3	PCB Components	3kg	26x21x14cm	\N	pending_inspection	\N
163	ITEM-0063	SKU-0063	Aruba PCB Components Component 63	Aruba	39	E	1	3	5	\N	E-1-3-5	PCB Components	95kg	14x42x47cm	\N	ready_for_deployment	\N
164	ITEM-0064	SKU-0064	Palo Alto Passive Components Component 64	Palo Alto	27	B	2	10	5	\N	B-2-10-5	Passive Components	23kg	33x16x37cm	\N	pending_inspection	\N
165	ITEM-0065	SKU-0065	HP Servers Component 65	HP	3	B	2	10	4	\N	B-2-10-4	Servers	47kg	26x11x19cm	\N	installed	\N
166	ITEM-0066	SKU-0066	Juniper Servers Component 66	Juniper	6	B	2	1	3	\N	B-2-1-3	Servers	71kg	29x37x14cm	\N	installed	\N
167	ITEM-0067	SKU-0067	HP Servers Component 67	HP	23	D	1	2	3	\N	D-1-2-3	Servers	43kg	42x42x28cm	\N	ready_for_deployment	\N
168	ITEM-0068	SKU-0068	Microsoft Network Equipment Component 68	Microsoft	50	D	3	7	2	\N	D-3-7-2	Network Equipment	19kg	41x46x29cm	\N	pending_inspection	\N
169	ITEM-0069	SKU-0069	Fortinet Cables Component 69	Fortinet	26	C	1	1	1	\N	C-1-1-1	Cables	22kg	22x23x19cm	\N	pending_inspection	\N
170	ITEM-0070	SKU-0070	Palo Alto Passive Components Component 70	Palo Alto	7	A	2	1	5	\N	A-2-1-5	Passive Components	45kg	13x43x33cm	\N	pending_inspection	\N
171	ITEM-0071	SKU-0071	Cisco Network Equipment Component 71	Cisco	1	E	3	4	4	\N	E-3-4-4	Network Equipment	26kg	27x14x40cm	\N	ready_for_deployment	\N
172	ITEM-0072	SKU-0072	Aruba PCB Components Component 72	Aruba	41	A	4	7	3	\N	A-4-7-3	PCB Components	92kg	40x11x10cm	\N	installed	\N
173	ITEM-0073	SKU-0073	Cisco Servers Component 73	Cisco	45	D	1	8	4	\N	D-1-8-4	Servers	38kg	17x24x32cm	\N	installed	\N
174	ITEM-0074	SKU-0074	Aruba Passive Components Component 74	Aruba	20	D	4	3	4	\N	D-4-3-4	Passive Components	53kg	28x46x32cm	\N	ready_for_deployment	\N
175	ITEM-0075	SKU-0075	Lenovo Servers Component 75	Lenovo	50	D	4	2	2	\N	D-4-2-2	Servers	25kg	12x10x50cm	\N	installed	\N
176	ITEM-0076	SKU-0076	Cisco PCB Components Component 76	Cisco	32	C	4	9	5	\N	C-4-9-5	PCB Components	20kg	46x43x20cm	\N	ready_for_deployment	\N
177	ITEM-0077	SKU-0077	Juniper PCB Components Component 77	Juniper	49	E	3	1	3	\N	E-3-1-3	PCB Components	39kg	21x45x41cm	\N	installed	\N
178	ITEM-0078	SKU-0078	Cisco Cables Component 78	Cisco	4	D	3	4	3	\N	D-3-4-3	Cables	41kg	40x12x50cm	\N	pending_inspection	\N
179	ITEM-0079	SKU-0079	Palo Alto Servers Component 79	Palo Alto	8	B	2	10	1	\N	B-2-10-1	Servers	47kg	32x20x39cm	\N	pending_inspection	\N
180	ITEM-0080	SKU-0080	Microsoft Infrastructure Component 80	Microsoft	47	A	4	6	5	\N	A-4-6-5	Infrastructure	23kg	17x40x36cm	\N	ready_for_deployment	\N
181	ITEM-0081	SKU-0081	Juniper Semiconductors Component 81	Juniper	33	D	2	6	1	\N	D-2-6-1	Semiconductors	42kg	28x44x47cm	\N	installed	\N
182	ITEM-0082	SKU-0082	Aruba Cables Component 82	Aruba	3	A	3	6	4	\N	A-3-6-4	Cables	93kg	33x16x46cm	\N	installed	\N
183	ITEM-0083	SKU-0083	VMware PCB Components Component 83	VMware	30	A	1	9	2	\N	A-1-9-2	PCB Components	87kg	45x36x47cm	\N	installed	\N
184	ITEM-0084	SKU-0084	Fortinet Servers Component 84	Fortinet	5	A	2	7	2	\N	A-2-7-2	Servers	94kg	25x42x35cm	\N	ready_for_deployment	\N
185	ITEM-0085	SKU-0085	VMware Servers Component 85	VMware	33	C	5	9	5	\N	C-5-9-5	Servers	46kg	42x18x34cm	\N	ready_for_deployment	\N
186	ITEM-0086	SKU-0086	Cisco Infrastructure Component 86	Cisco	21	C	4	8	3	\N	C-4-8-3	Infrastructure	54kg	38x10x27cm	\N	installed	\N
187	ITEM-0087	SKU-0087	VMware Infrastructure Component 87	VMware	15	A	3	5	5	\N	A-3-5-5	Infrastructure	74kg	22x32x25cm	\N	pending_inspection	\N
188	ITEM-0088	SKU-0088	Microsoft Servers Component 88	Microsoft	25	B	3	5	4	\N	B-3-5-4	Servers	17kg	11x11x18cm	\N	ready_for_deployment	\N
189	ITEM-0089	SKU-0089	Aruba Storage Component 89	Aruba	48	B	3	2	1	\N	B-3-2-1	Storage	66kg	21x47x43cm	\N	pending_inspection	\N
190	ITEM-0090	SKU-0090	Palo Alto Servers Component 90	Palo Alto	10	B	3	2	2	\N	B-3-2-2	Servers	61kg	11x10x31cm	\N	pending_inspection	\N
191	ITEM-0091	SKU-0091	Dell Servers Component 91	Dell	9	B	5	8	5	\N	B-5-8-5	Servers	93kg	32x14x37cm	\N	ready_for_deployment	\N
192	ITEM-0092	SKU-0092	Aruba Servers Component 92	Aruba	3	B	1	2	3	\N	B-1-2-3	Servers	98kg	22x24x16cm	\N	pending_inspection	\N
193	ITEM-0093	SKU-0093	Aruba Passive Components Component 93	Aruba	15	E	4	8	2	\N	E-4-8-2	Passive Components	8kg	11x30x41cm	\N	ready_for_deployment	\N
194	ITEM-0094	SKU-0094	HP Network Equipment Component 94	HP	13	E	3	2	1	\N	E-3-2-1	Network Equipment	21kg	10x49x45cm	\N	installed	\N
195	ITEM-0095	SKU-0095	Aruba Network Equipment Component 95	Aruba	39	B	1	6	4	\N	B-1-6-4	Network Equipment	87kg	15x23x17cm	\N	pending_inspection	\N
196	ITEM-0096	SKU-0096	VMware PCB Components Component 96	VMware	49	A	1	9	4	\N	A-1-9-4	PCB Components	82kg	44x19x21cm	\N	ready_for_deployment	\N
197	ITEM-0097	SKU-0097	Fortinet PCB Components Component 97	Fortinet	15	A	3	2	4	\N	A-3-2-4	PCB Components	98kg	39x36x38cm	\N	pending_inspection	\N
198	ITEM-0098	SKU-0098	Juniper Semiconductors Component 98	Juniper	9	B	4	7	2	\N	B-4-7-2	Semiconductors	49kg	19x40x50cm	\N	ready_for_deployment	\N
199	ITEM-0099	SKU-0099	Palo Alto Servers Component 99	Palo Alto	2	B	2	7	4	\N	B-2-7-4	Servers	37kg	14x28x40cm	\N	pending_inspection	\N
200	ITEM-0100	SKU-0100	HP Infrastructure Component 100	HP	44	D	2	4	4	\N	D-2-4-4	Infrastructure	84kg	46x23x13cm	\N	installed	\N
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, client_id, status, notes, items) FROM stdin;
4	14	submitted	Urgent order for network equipment	[{"item_id": "SWITCH-001", "description": "Cisco Catalyst 9300", "vendor": "Cisco", "quantity": 5}, {"item_id": "ROUTER-001", "description": "Cisco ISR 4331", "vendor": "Cisco", "quantity": 2}]
5	15	in_progress	Server room upgrade equipment	[{"item_id": "SERVER-001", "description": "Dell PowerEdge R740", "vendor": "Dell", "quantity": 3}, {"item_id": "RACK-001", "description": "42U Server Rack", "vendor": "StarTech", "quantity": 2}]
6	16	closed	Completed office setup	[{"item_id": "AP-001", "description": "Cisco Meraki MR46", "vendor": "Cisco", "quantity": 10}, {"item_id": "CABLE-001", "description": "Cat6 Ethernet Cable 1000ft", "vendor": "Monoprice", "quantity": 5}]
\.


--
-- Data for Name: packing_slips; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packing_slips (id, filename, content_type, file_url, shipment_id, inventory_item_id, uploaded_by) FROM stdin;
4	packing_slip_cisco_001.pdf	application/pdf	/uploads/packing_slip_cisco_001.pdf	21	101	13
5	packing_slip_dell_001.pdf	application/pdf	/uploads/packing_slip_dell_001.pdf	22	102	13
6	packing_slip_cisco_002.pdf	application/pdf	/uploads/packing_slip_cisco_002.pdf	23	103	10
\.


--
-- Data for Name: shipments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipments (id, our_name, our_address, bill_to, ship_to, invoice_number, invoice_date, due_date, ship_via, order_number, qty, item_type, item_desc, order_id) FROM stdin;
21	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Aruba Networks\n654 WiFi Street\nSunnyvale, CA 94085	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-001	2025-10-31	2025-12-05	DHL	ORD-2024-001	15	Switches	Aruba Storage Devices - Model 259	5
22	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Aruba Networks\n654 WiFi Street\nSunnyvale, CA 94085	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-002	2025-10-20	2025-12-10	FedEx	ORD-2024-002	13	Components	Aruba Storage Devices - Model 970	6
23	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Cisco Systems Inc\n123 Tech Drive\nSan Jose, CA 95134	UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-003	2025-10-31	2025-12-17	USPS	ORD-2024-003	16	Servers	Cisco Routers - Model 318	4
24	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Cisco Systems Inc\n123 Tech Drive\nSan Jose, CA 95134	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-004	2025-10-19	2025-12-04	FedEx	ORD-2024-004	8	Routers	Cisco Network Equipment - Model 151	5
25	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Dell Technologies\n456 Server Lane\nAustin, TX 78701	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-005	2025-10-24	2025-12-12	DHL	ORD-2024-005	17	Switches	Dell Routers - Model 706	6
26	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Cisco Systems Inc\n123 Tech Drive\nSan Jose, CA 95134	UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-006	2025-11-04	2025-12-10	Will Call	ORD-2024-006	22	Access Points	Cisco Routers - Model 406	4
27	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Dell Technologies\n456 Server Lane\nAustin, TX 78701	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-007	2025-11-09	2025-12-15	USPS	ORD-2024-007	2	Storage Devices	Dell Switches - Model 451	5
28	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Juniper Networks\n135 Router Road\nSunnyvale, CA 94089	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-008	2025-11-03	2026-01-15	FedEx	ORD-2024-008	19	Components	Juniper Switches - Model 621	6
29	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Lenovo Corp\n321 Computer Way\nMorrisville, NC 27560	UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-009	2025-10-20	2025-12-06	Will Call	ORD-2024-009	18	Servers	Lenovo Access Points - Model 519	4
30	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	HP Enterprise\n789 Hardware Blvd\nPalo Alto, CA 94304	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-010	2025-11-10	2025-12-25	Will Call	ORD-2024-010	9	Switches	HP Network Equipment - Model 908	5
31	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Dell Technologies\n456 Server Lane\nAustin, TX 78701	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-011	2025-10-25	2025-12-14	Local Delivery	ORD-2024-011	5	Cables	Dell Routers - Model 707	6
32	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Microsoft Corp\n987 Software Ave\nRedmond, WA 98052	UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-012	2025-11-13	2026-01-02	Will Call	ORD-2024-012	24	Cables	Microsoft Storage Devices - Model 306	4
33	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	VMware Inc\n246 Virtual Dr\nPalo Alto, CA 94304	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-013	2025-10-26	2025-12-25	FedEx	ORD-2024-013	3	Routers	VMware Servers - Model 816	5
34	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Juniper Networks\n135 Router Road\nSunnyvale, CA 94089	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-014	2025-10-25	2025-12-15	USPS	ORD-2024-014	1	Network Equipment	Juniper Components - Model 215	6
35	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	HP Enterprise\n789 Hardware Blvd\nPalo Alto, CA 94304	UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-015	2025-11-09	2026-01-04	FedEx	ORD-2024-015	17	Cables	HP Servers - Model 692	4
36	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Cisco Systems Inc\n123 Tech Drive\nSan Jose, CA 95134	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-016	2025-11-14	2026-01-13	UPS	ORD-2024-016	9	Cables	Cisco Access Points - Model 538	5
37	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Microsoft Corp\n987 Software Ave\nRedmond, WA 98052	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-017	2025-10-18	2025-12-18	DHL	ORD-2024-017	19	Components	Microsoft Cables - Model 139	6
38	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	HP Enterprise\n789 Hardware Blvd\nPalo Alto, CA 94304	UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-018	2025-10-26	2025-12-03	DHL	ORD-2024-018	25	Cables	HP Network Equipment - Model 310	4
39	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	VMware Inc\n246 Virtual Dr\nPalo Alto, CA 94304	UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-019	2025-10-30	2025-12-26	USPS	ORD-2024-019	4	Network Equipment	VMware Components - Model 527	5
40	Flowventory	University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223	Lenovo Corp\n321 Computer Way\nMorrisville, NC 27560	UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223	INV-2024-020	2025-10-29	2026-01-15	Local Delivery	ORD-2024-020	5	Access Points	Lenovo Routers - Model 237	6
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, firstname, role, password, assigned_pages) FROM stdin;
10	Preet	Preet	admin	P@ss123!	["dashboard", "stock", "pick", "shipments", "inventory", "admin"]
11	Carlotta	Carlotta	admin	C@rl456@	["dashboard", "stock", "pick", "shipments", "inventory", "admin"]
12	Yana	Yana	engineer	Y@na789#	["dashboard", "stock", "pick", "shipments", "inventory"]
13	Dany	Dany	engineer	D@ny012$	["dashboard", "stock", "pick", "shipments", "inventory"]
14	Jack	Jack	manager	J@ck345%	["dashboard", "stock", "pick", "shipments", "inventory"]
15	Sarah	Sarah	manager	S@rah567&	["dashboard", "stock", "pick", "shipments", "inventory"]
16	Mike	Mike	engineer	M!ke890*	["dashboard", "stock", "pick", "shipments", "inventory"]
17	Emily	Emily	engineer	Em!ly234#	["dashboard", "stock", "pick", "shipments", "inventory"]
18	Alex	Alex	manager	Al3x567$	["dashboard", "stock", "pick", "shipments", "inventory"]
\.


--
-- Name: inventory_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_items_id_seq', 200, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);


--
-- Name: packing_slips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packing_slips_id_seq', 6, true);


--
-- Name: shipments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shipments_id_seq', 40, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: inventory_items inventory_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_items
    ADD CONSTRAINT inventory_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: packing_slips packing_slips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packing_slips
    ADD CONSTRAINT packing_slips_pkey PRIMARY KEY (id);


--
-- Name: shipments shipments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_inventory_items_barcode; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_inventory_items_barcode ON public.inventory_items USING btree (barcode);


--
-- Name: ix_inventory_items_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_inventory_items_id ON public.inventory_items USING btree (id);


--
-- Name: ix_inventory_items_item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_inventory_items_item_id ON public.inventory_items USING btree (item_id);


--
-- Name: ix_inventory_items_sku; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_inventory_items_sku ON public.inventory_items USING btree (sku);


--
-- Name: ix_orders_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_orders_id ON public.orders USING btree (id);


--
-- Name: ix_packing_slips_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_packing_slips_id ON public.packing_slips USING btree (id);


--
-- Name: ix_shipments_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_shipments_id ON public.shipments USING btree (id);


--
-- Name: ix_shipments_invoice_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_shipments_invoice_number ON public.shipments USING btree (invoice_number);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: inventory_items inventory_items_last_shipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_items
    ADD CONSTRAINT inventory_items_last_shipment_id_fkey FOREIGN KEY (last_shipment_id) REFERENCES public.shipments(id);


--
-- Name: orders orders_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- Name: packing_slips packing_slips_inventory_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packing_slips
    ADD CONSTRAINT packing_slips_inventory_item_id_fkey FOREIGN KEY (inventory_item_id) REFERENCES public.inventory_items(id);


--
-- Name: packing_slips packing_slips_shipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packing_slips
    ADD CONSTRAINT packing_slips_shipment_id_fkey FOREIGN KEY (shipment_id) REFERENCES public.shipments(id);


--
-- Name: packing_slips packing_slips_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packing_slips
    ADD CONSTRAINT packing_slips_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- Name: shipments shipments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--

\unrestrict lL85SaTZolX06JUAe9CnFLtuyKaikDGrDiB5PymfBNA0bOImyRxDu1E4JhrMwUS

