Currency is tracked with a 3 level DB structure. The system is broken down into [[Standard|Standards]], [[Currency/Alerts|Alerts]], and [[Currency/Actions|Actions]].

## Use Case
1. User Creates a [[Standard]]
2. The server creates [[Currency/Alert|Alerts]] from that [[Standard]]
3. When an [[Currency/Alert|Alert]] is triggered it:
4. Performs the [[Currency/Actions|Actions]] it has attached to it
5. Requests a renewal from the server
6. Goto #2