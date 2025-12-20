'use client'

import { useState } from "react"
import { updateAuctionTest } from "../actions/auctionactions"
import { FaSpinner } from "react-icons/fa"

export default function AuthTest() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ status: number, message: string } | null>(null)

  function handleUpdate() {
    setResult(null)
    setLoading(true)

    updateAuctionTest().then(res => setResult(res))
      .catch(error => setResult(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex items-center gap-4">
      <button onClick={handleUpdate}
      className="border border-2 border-gray-400 p-2 rounded-md">
        {loading && <FaSpinner className="me-3" />}
        test auth
      </button>
      <div>{JSON.stringify(result,null,2)}</div>
    </div>
  )
}
